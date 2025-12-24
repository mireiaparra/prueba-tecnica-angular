import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../../core/auth.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private auth = inject(AuthService);

  public submitting: boolean = false;
  public error?: string;
  public form: FormGroup;

  public get email() {
    return this.form.get('email');
  }

  public get password() {
    return this.form.get('password');
  }

  constructor() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  public submit() {
    this.form.markAllAsTouched();
    if (!this.form.valid) return;
    this.submitting = true;
    this.error = undefined;

    const email = this.email?.value;
    const password = this.password?.value;

    this.auth
      .login(email, password)
      .pipe(finalize(() => (this.submitting = false)))
      .subscribe({
        next: () => this.router.navigate(['/calendar']),
        error: (err: any) => {
          this.error = err?.error?.message || err?.message || 'Error en login';
        },
      });
  }
}
