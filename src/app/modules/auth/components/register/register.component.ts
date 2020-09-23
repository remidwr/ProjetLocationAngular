import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'auth-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _authService: AuthService
  ) { 
    if (this._authService.currentUserValue) { 
        this._router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.registerForm = this._formBuilder.group({
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      birthdate: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(320)]],
      passwd: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
    });
    // this.initForm();
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;

      if (this.registerForm.invalid) {
          return;
      }

      this.loading = true;
      this._authService.register(this.f.firstName.value, this.f.lastName.value, this.f.birthdate.value, this.f.email.value, this.f.passwd.value)
          .pipe(first())
          .subscribe(
              data => {
                  this._router.navigate(['/auth/login']);
              },
              error => {
                  this.loading = false;
              });
  }
}
