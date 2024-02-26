import {
  Component,
  OnInit,
  ViewChild,
  ɵflushModuleScopingQueueAsMuchAsPossible,
} from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopinglist.service';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  editMode = false;
  ingredient!: Ingredient;
  id!: number;
  constructor(
    private slService: ShoppingListService,
    private store: Store<fromShoppingList.AppState>
  ) {}
  ngOnInit(): void {
    this.slService.startEdit.subscribe((index: number) => {
      this.id = index;
      this.editMode = true;
      this.ingredient = this.slService.getIngredient(index);
      this.form.setValue({
        name: this.ingredient.name,
        amount: this.ingredient.amount,
      });
    });
  }
  onAdd(form: NgForm) {
    const name = form.value.name;
    const amount = form.value.amount;

    const ingredient = new Ingredient(name, amount);
    if (this.editMode) {
      // this.slService.updateIngredient(this.id, ingredient);
      this.store.dispatch(
        new ShoppingListActions.UpdateIngredient({
          index: this.id,
          ingredient: ingredient,
        })
      );
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
  }
  onDelete() {
    this.onClear();
    // this.slService.deleteIngredient(this.id);
    this.store.dispatch(
      new ShoppingListActions.DeleteIngredient({ index: this.id })
    );
  }
}
