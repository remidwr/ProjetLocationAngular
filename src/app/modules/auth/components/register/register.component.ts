import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { 
    if (this.authService.currentUserValue) { 
        this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      LastName: ['', [Validators.required, Validators.maxLength(50)]],
      FirstName: ['', [Validators.required, Validators.maxLength(50)]],
      Birthdate: ['', Validators.required],
      Email: ['', [Validators.required, Validators.maxLength(320)]],
      Passwd: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
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
      this.authService.register(this.registerForm.value)
          .pipe(first())
          .subscribe(
              data => {
                  this.alertService.success('Registration successful', true);
                  this.router.navigate(['/auth/login']);
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
  }
}
