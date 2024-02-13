import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopinglist.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  constructor(private slService: ShoppingListService) {}
  icSub: Subscription | undefined;
  Ingredients: Ingredient[] = [];
  ngOnInit(): void {
    this.Ingredients = this.slService.getIngredients();
    this.icSub = this.slService.ingredientChanged.subscribe(
      (ingredient: Ingredient[]) => {
        this.Ingredients = ingredient;
      }
    );
  }
  ngOnDestroy(): void {
    this.icSub?.unsubscribe();
  }
}
