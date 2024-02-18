import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  constructor(private authService: AuthService) {}
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
      this.isLoading = true;
      if (this.isLogin) {
      } else {
        const email = form.value.email;
        const password = form.value.password;
        this.authService.signUp(email, password).subscribe(
          (response) => {
            console.log(response);
            this.isLoading = false;
          },
          (error) => {
            console.log(error);
            this.error = error;
            this.isLoading = false;
          }
        );
      }
    }
    form.reset();
  }
}
