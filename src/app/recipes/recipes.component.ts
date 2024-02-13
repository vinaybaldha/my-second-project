import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css',
  providers: [],
})
export class RecipesComponent implements OnInit {
  recipeDisc: Recipe | undefined;
  constructor() {}
  ngOnInit(): void {}
}
