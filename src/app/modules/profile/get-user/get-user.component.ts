import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserFull } from './../models/user.model';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { ProfileService } from './../services/profile.service';
import { Component, OnDestroy, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { first } from 'rxjs/operators';
import { ErrorHandler } from 'src/app/helpers/error.handler';

@Component({
  selector: 'profile-get-user',
  templateUrl: './get-user.component.html',
  styleUrls: ['./get-user.component.scss']
})
export class GetUserComponent implements OnInit, OnDestroy {
  userForm: FormGroup;
  user: UserFull = new UserFull();

  errors: any = {};
  error = false;
  errorMsg: string;

  spinnerButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: 'Modifier',
    spinnerSize: 19,
    raised: true,
    stroked: false,
    buttonColor: 'primary',
    spinnerColor: 'accent',
    fullWidth: false,
    disabled: false,
    mode: 'indeterminate',
  };

  constructor(
    private _formBuilder: FormBuilder,
    private _profileService: ProfileService,
    private _authService: AuthService,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _errorHandler: ErrorHandler,
  ) { }

  ngOnInit(): void {
    this._profileService.getOne(this._authService.userValue.id).subscribe({
      next: dataFromService => {
        this.user = dataFromService;
        this.userForm = this._formBuilder.group({
          street: [this.user.street, [Validators.required, Validators.maxLength(120)]],
          number: [this.user.number, [Validators.required, Validators.maxLength(10)]],
          box: [this.user.box, [Validators.maxLength(10)]],
          postCode: [this.user.postCode, [Validators.required]],
          city: [this.user.city, [Validators.required, Validators.maxLength(120)]],
          phone1: [this.user.phone1, [Validators.required, Validators.minLength(10), Validators.maxLength(12)]],
          phone2: [this.user.phone2 === null ? '' : this.user.phone2],
        });
        this._errorHandler.handleErrors(this.userForm, this.errors);
      },
      error: error => console.log(error.message)
    });
  }

  ngOnDestroy(): void {
    console.log('Component destroyed');
  }

  get f() {
    return this.userForm.controls;
  }

  onSubmit() {
    this.spinnerButtonOptions.active = true;

    console.log(this.userForm.value);
    this._profileService
      .updateAddress(this._authService.userValue.id, this.userForm.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this._router.navigate(['/profil/monprofil']);
          this.spinnerButtonOptions.active = false;
          this._snackBar.open('Mise à jour réussie', 'Annuler', {
            panelClass: ['colored-snackbar'],
          });
        },
        (error) => {
          this._snackBar.open(error.message, 'Annuler', {
            panelClass: ['colored-snackbar'],
          });
          this.spinnerButtonOptions.active = false;
        }
      );
  }

  changeImage() {
    console.log("click");
  }
}
