import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription, map } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import * as fromAuthActions from '../auth/store/auth.actions';
import * as fromRecipeActions from '../recipes/store/recipes.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated!: boolean;
  userAuth!: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.userAuth = this.store
      .select('auth')
      .pipe(map((authState) => authState.user))
      .subscribe((user) => {
        this.isAuthenticated = !!user;
      });
  }

  @Output() selectMenu = new EventEmitter<string>();

  onClick(name: string) {
    this.selectMenu.emit(name);
  }
  onSave() {
    // this.dataStorageService.saveData();
    this.store.dispatch(new fromRecipeActions.StoreRecipes());
  }
  onFatch() {
    // this.dataStorageService.fatchData().subscribe();
    this.store.dispatch(new fromRecipeActions.FatchRecipes());
  }
  ngOnDestroy(): void {
    this.userAuth.unsubscribe();
  }
  onLogout() {
    // this.authService.logout();
    this.store.dispatch(new fromAuthActions.Logout());
  }
}
