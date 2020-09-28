import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { first } from 'rxjs/operators';
import { ErrorHandler } from 'src/app/helpers/error.handler';
import { Good } from '../../models/good.model';
import { GoodService } from '../../services/good.service';

@Component({
  selector: 'app-create-good',
  templateUrl: './create-good.component.html',
  styleUrls: ['./create-good.component.scss']
})
export class CreateGoodComponent implements OnInit {
  goodForm: FormGroup;
  good: Good;
  errors: any = {};
  error = false;
  errorMsg :string;

  spinnerButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: "Ajouter",
    spinnerSize: 19,
    raised: true,
    stroked: false,
    buttonColor: 'primary',
    spinnerColor: 'primary',
    fullWidth: false,
    disabled: false,
    mode: 'indeterminate'
  }

  constructor(
    private _fromBuilder: FormBuilder,
    private _router: Router,
    private _goodService: GoodService,
    private _errorHandler: ErrorHandler,
    private _snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {

    this.goodForm = this._fromBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', Validators.required],
      state: ['', [Validators.required]], // TODO ajout des différents etats
      amountPerDay: ['', [Validators.max(100000)]],
      amountPerWeek: ['', [Validators.max(100000)]],
      amountPerMonth: ['', [Validators.max(100000)]],
      street: ['', [Validators.required, Validators.maxLength(120)]],
      number: ['', [Validators.required, Validators.maxLength(10)]],
      box: ['', [Validators.maxLength(10)]],
      postCode: ['', [Validators.required, Validators.min(1000), Validators.max(9999)]],
      city: ['', [Validators.required, Validators.maxLength(50)]],
      picture: ['', [Validators.required, Validators.maxLength(320)]],
      section: ['', [Validators.required]],
      category: ['', [Validators.required]]
    });

    this._errorHandler.handleErrors(this.goodForm, this.errors);
  }

  get f() { return this.goodForm.controls; }

  onSubmit() {
    this.error = false;
    this.errorMsg = "";
    this.spinnerButtonOptions.active = true;

    if (this.checkform())
    {
      this._goodService.create(this.good)
        .pipe(first())
        .subscribe(
          data => {
            this._router.navigate(['/annonce/annonces']);
          },
          error => {
            this._snackBar.open(error, 'Annuler', { panelClass: ['colored-snackbar'] });
            this.spinnerButtonOptions.active = false;
          }
        )
    }
    else {
      this.error = true;
      this.errorMsg = "Un montant doit être indiqué";
      this._snackBar.open(this.errorMsg, 'Annuler', { panelClass: ['colored-snackbar'] });
      this.spinnerButtonOptions.active = false;
    }
  }

  checkform(): boolean{
    if (this.goodForm.value.amountPerDay && this.goodForm.value.amountPerWeek && this.goodForm.value.amountPerMonth == null) {
      return false;
    }
    else {
      return true;
    }
  }

}
