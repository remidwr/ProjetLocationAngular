import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { first } from 'rxjs/operators';
import { ErrorHandler } from 'src/app/helpers/error.handler';
import { Good } from '../../models/good.model';
import { GoodService } from '../../services/good.service';
import { Section } from '../../models/section.model';
import { Category } from '../../models/category.model';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-good',
  templateUrl: './create-good.component.html',
  styleUrls: ['./create-good.component.scss'],
})
export class CreateGoodComponent implements OnInit {
  progress: number;
  message: string;
  @Output() public onUploadFinished = new EventEmitter();

  goodForm: FormGroup;
  good: Good;
  sections: Section[];
  categories: Category[];
  isSectionSelected: boolean = false;

  errors: any = {};
  error = false;
  errorMsg: string;

  srcResult: string;

  spinnerButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: 'Ajouter',
    spinnerSize: 19,
    raised: true,
    stroked: false,
    buttonColor: 'primary',
    spinnerColor: 'primary',
    fullWidth: false,
    disabled: false,
    mode: 'indeterminate',
  };

  constructor(
    private _fromBuilder: FormBuilder,
    private _http: HttpClient,
    private _router: Router,
    private _goodService: GoodService,
    private _errorHandler: ErrorHandler,
    private _snackBar: MatSnackBar,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this._goodService.getSection().subscribe((x) => (this.sections = x));
    this._goodService.getCategory().subscribe((x) => (this.categories = x));

    this.goodForm = this._fromBuilder.group({
      name: ['Un objet à louer', [Validators.required, Validators.maxLength(50)]],
      description: ['Une description...', Validators.required],
      state: ['Neuf', [Validators.required]],
      amountPerDay: [null, [Validators.min(0), Validators.max(100000)]],
      amountPerWeek: [null, [Validators.min(0), Validators.max(100000)]],
      amountPerMonth: [null, [Validators.min(0), Validators.max(100000)]],
      street: ['Rue du test', [Validators.required, Validators.maxLength(120)]],
      number: ['1', [Validators.required, Validators.maxLength(10)]],
      box: [null, [Validators.maxLength(10)]],
      postCode: ['1000', [Validators.required, Validators.min(1000), Validators.max(9999)]],
      city: ['Bruxelles', [Validators.required, Validators.maxLength(50)]],
      picture: ['', [Validators.required, Validators.maxLength(320)]],
      sectionId: [null, [Validators.required]],
      categoryId: [null, [Validators.required]],
      userId: [this._authService.userValue.id]
    });

    this._errorHandler.handleErrors(this.goodForm, this.errors);
  }

  get f() {
    return this.goodForm.controls;
  }

  onSubmit(): void {
    this.error = false;
    this.errorMsg = '';
    this.spinnerButtonOptions.active = true;

    if (this.checkform()) {
      this._goodService
        .create(this.goodForm.value)
        .pipe(first())
        .subscribe(
          (data) => {
            this._router.navigate(['/annonce/annonces']);
          },
          (error) => {
            this._snackBar.open(error.message, 'Annuler', {
              panelClass: ['colored-snackbar'],
            });
            this.spinnerButtonOptions.active = false;
          }
        );
    } else {
      this.error = true;
      this.errorMsg = 'Un montant doit être indiqué';
      this._snackBar.open(this.errorMsg, 'Annuler', {
        panelClass: ['colored-snackbar'],
      });
      this.spinnerButtonOptions.active = false;
    }
  }

  checkform(): boolean {
    if (
      this.goodForm.value.amountPerDay === null &&
      this.goodForm.value.amountPerWeek === null &&
      this.goodForm.value.amountPerMonth === null
    ) {
      return false;
    } else {
      return true;
    }
  }

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this._http.post(`${environment.apiUrl}/upload`, formData, { reportProgress: true, observe: 'events' })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Chargement réussi';
          const { dbPath } = event.body as any;
          this.onUploadFinished.emit(event.body);
          console.log(event.body);
          this.goodForm.get('picture').setValue(`${environment.ressourceUrl}/${dbPath}`);
        }
      });
  }

  onSectionChangeAction(sectionId: number) {
    this.isSectionSelected = false;
    this._goodService.getCategoriesBySection(sectionId).subscribe(categories => this.categories = categories);

    for (let category of this.categories) {
      if (true) {
        this.isSectionSelected = true;
      } else {
        this.isSectionSelected = false;
      }
    }
  }
}
