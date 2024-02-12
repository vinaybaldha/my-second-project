import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopinglist.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent implements OnInit {
  constructor(private slService: ShoppingListService) {}
  Ingredients: Ingredient[] = [];
  ngOnInit(): void {
    this.Ingredients = this.slService.getIngredients();
    this.slService.ingredientChanged.subscribe((ingredient: Ingredient[]) => {
      this.Ingredients = ingredient;
    });
  }
}
