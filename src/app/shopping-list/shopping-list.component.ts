import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopinglist.service';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  constructor(
    private slService: ShoppingListService,
    private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>
  ) {}
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
    this.slService.startEdit.next(index);
  }
}
