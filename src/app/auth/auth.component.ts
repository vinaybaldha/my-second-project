import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, authResponse } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  constructor(private authService: AuthService, private router: Router) {}
  authHandle!: Observable<authResponse>;
  isLogin = false;
  isLoading = false;
  error: string | undefined;

  onSwitch() {
    this.isLogin = !this.isLogin;
  }
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    } else {
      const email = form.value.email;
      const password = form.value.password;
      this.isLoading = true;
      if (this.isLogin) {
        this.authHandle = this.authService.login(email, password);
      } else {
        this.authHandle = this.authService.signUp(email, password);
      }
    }
    this.authHandle.subscribe(
      (response) => {
        console.log(response);
        this.isLoading = false;
        this.error = undefined;
        this.router.navigate(['/recipes']);
      },
      (error) => {
        console.log(error);
        this.error = error;
        this.isLoading = false;
      }
    );
    form.reset();
  }
}
