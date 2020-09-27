import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { MustMatch } from '../../helpers/mustmatch.validator';
import { ErrorHandler } from '../../../../helpers/error.handler';

import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

import { AuthService } from '../../services/auth.service';
import { MatProgressButtonOptions } from 'mat-progress-buttons';

@Component({
  selector: 'auth-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'fr'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errors: any = {};
  startDate = new Date(1990, 1, 1);
  hide = true;

  spinnerButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: "S'enregistrer",
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
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _authService: AuthService,
    private _dateAdapter: DateAdapter<any>,
    private _errorHandler: ErrorHandler,
    private _snackBar: MatSnackBar
  ) { 
    if (this._authService.userValue) { 
        this._router.navigate(['/home']);
    }
  }

  ngOnInit(): void {
    this._dateAdapter.setLocale('fr');

    this.registerForm = this._formBuilder.group({
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      birthdate: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(320)]],
      passwd: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      confirmPasswd: ['', Validators.required]
    }, {
      validator: MustMatch('passwd', 'confirmPasswd')
    });

    this._errorHandler.handleErrors(this.registerForm, this.errors);
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.spinnerButtonOptions.active = true;
      this._authService.register(this.f.firstName.value, this.f.lastName.value, this.f.birthdate.value, this.f.email.value, this.f.passwd.value)
          .pipe(first())
          .subscribe(
              data => {
                  this._router.navigate(['/auth/login']);
              },
              error => {
                  this._snackBar.open(error, 'Annuler', { panelClass: ['colored-snackbar'] });
                  this.spinnerButtonOptions.active = false;
              });
  }
}
