import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromShoppingList from './store/shopping-list.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  constructor(private store: Store<fromApp.AppState>) {}
  icSub: Subscription | undefined;
  Ingredients: Observable<{ ingredients: Ingredient[] }>;
  ngOnInit(): void {
    this.Ingredients = this.store.select('shoppingList');
    // this.Ingredients =this.slService.getIngredients();
  }
  ngOnDestroy(): void {
    this.icSub?.unsubscribe();
  }
  onEdit(index: number) {
    // this.slService.startEdit.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }
}
