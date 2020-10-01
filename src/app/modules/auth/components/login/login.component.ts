import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';
import { ErrorHandler } from 'src/app/helpers/error.handler';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressButtonOptions } from 'mat-progress-buttons';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;
  errors: any = {};
  hide = true;

  spinnerButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: 'Confirmer',
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
    private _route: ActivatedRoute,
    private _router: Router,
    private _authService: AuthService,
    private _errorHandler: ErrorHandler,
    private _snackBarService: MatSnackBar
  ) {
    if (this._authService.userValue) {
      this._router.navigate(['/home']);
    }
  }

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(320)]],
      passwd: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
    });

    this._errorHandler.handleErrors(this.loginForm, this.errors);
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/home';
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.spinnerButtonOptions.active = true;
    this._authService.login(this.f.email.value, this.f.passwd.value)
      .pipe(first())
      .subscribe(
        data => {
          this._router.navigate([this.returnUrl]);
        },
        error => {
          this._snackBarService.open(error, 'Annuler', { panelClass: ['colored-snackbar'] });
          this.spinnerButtonOptions.active = false;
        });
  }
}
