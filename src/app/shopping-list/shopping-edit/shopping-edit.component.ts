import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import { Subscription } from 'rxjs';
import * as fromApp from '../../store/app.reducer';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') form!: NgForm;
  editMode = false;
  ingredient!: Ingredient;
  subscription: Subscription;
  id!: number;
  constructor(private store: Store<fromApp.AppState>) {}
  ngOnInit(): void {
    this.subscription = this.store
      .select('shoppingList')
      .subscribe((stateData) => {
        if (stateData.editedIndex > -1) {
          this.id = stateData.editedIndex;
          this.editMode = true;
          this.ingredient = stateData.editedIngredient;
          this.form.setValue({
            name: this.ingredient.name,
            amount: this.ingredient.amount,
          });
        } else {
          this.editMode = false;
        }
      });

    this.store.select('shoppingList').subscribe();
  }
  onAdd(form: NgForm) {
    const name = form.value.name;
    const amount = form.value.amount;

    const ingredient = new Ingredient(name, amount);
    if (this.editMode) {
      // this.slService.updateIngredient(this.id, ingredient);
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(ingredient));
      this.store;
    } else {
      // this.slService.addIngredient(ingredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(ingredient));
    }
    this.editMode = false;
    form.reset();
  }
  onClear() {
    this.form.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.EndEdit());
  }
  onDelete() {
    // this.slService.deleteIngredient(this.id);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
