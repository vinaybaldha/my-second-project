import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { authResponse } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as fromAuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent implements OnInit, OnDestroy {
  constructor(private store: Store<fromApp.AppState>) {}
  authHandle!: Observable<authResponse>;
  isLogin = false;
  isLoading = false;
  error: string | undefined;
  subState: Subscription;

  ngOnInit(): void {
    this.subState = this.store.select('auth').subscribe((authState) => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
    });
  }

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
        // this.authHandle = this.authService.login(email, password);
        this.store.dispatch(
          new fromAuthActions.LoginStart({ email: email, password: password })
        );
      } else {
        // this.authHandle = this.authService.signUp(email, password);
        this.store.dispatch(
          new fromAuthActions.SignUpStart({ email: email, password: password })
        );
      }
    }
    // this.authHandle.subscribe(
    //   (response) => {
    //     console.log(response);
    //     this.isLoading = false;
    //     this.error = undefined;
    //     this.router.navigate(['/recipes']);
    //   },
    //   (error) => {
    //     console.log(error);
    //     this.error = error;
    //     this.isLoading = false;
    //   }
    // );
    form.reset();
  }
  onHandleError() {
    this.store.dispatch(new fromAuthActions.ClearError());
  }

  ngOnDestroy(): void {
    if (this.subState) {
      this.subState.unsubscribe();
    }
  }
}
