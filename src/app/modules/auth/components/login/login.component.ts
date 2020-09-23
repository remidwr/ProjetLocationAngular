import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private _authService: AuthService
  ) {
    // renvoie vers '/' si déjà loggué
    if (this._authService.currentUserValue) {
      this._router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      passwd: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
    })

    // récupère l'URL du paramètre de la route ou par défaut '/'
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
  }

  // getter pour un accès plus facile aux champs du formulaire
  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;

      // s'arrête ici si le formulaire n'est pas valide
      if (this.loginForm.invalid) {
          return;
      }
      this.loading = true;
      this._authService.login(this.f.email.value, this.f.passwd.value)
          .pipe(first())
          .subscribe(
              data => {
                this._router.navigate([this.returnUrl]);
              },
              error => {
                this.error = error;
                this.loading = false;
              });
  }
}
