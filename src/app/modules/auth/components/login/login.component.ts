import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
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
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    // renvoie vers '/' si déjà loggué
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      passwd: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
    })

    // récupère l'URL du paramètre de la route ou par défaut '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
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
      this.authService.login(this.f.email.value, this.f.passwd.value)
          .pipe(first())
          .subscribe(
              data => {
                  this.router.navigate([this.returnUrl]);
              },
              error => {
                this.error = error;
                this.loading = false;
              });
  }
}
