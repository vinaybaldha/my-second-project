import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css',
})
export class RecipeEditComponent implements OnInit {
  recipeName!: string;
  recipeImg!: string;
  recipeDesc!: string;
  rIngredients!: FormArray;
  form!: FormGroup;
  id: number | undefined;
  editMode = false;
  recipe!: Recipe;
  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      if ((this.editMode = true)) {
        this.recipe = this.recipeService.getRecipeById(this.id);
        this.recipeName = this.recipe.name;
        this.recipeImg = this.recipe.imagePath;
        this.recipeDesc = this.recipe.description;
        if (this.recipe.ingredients) {
          for (let ingredient of this.recipe.ingredients) {
            this.rIngredients.push(
              new FormGroup({
                name: new FormControl(ingredient.name),
                amount: new FormControl(ingredient.amount),
              })
            );
          }
        }
        this.initForm();
      }
    });
  }
  initForm() {
    this.form = new FormGroup({
      name: new FormControl(this.recipeName),
      description: new FormControl(this.recipeDesc),
      img: new FormControl(this.recipeImg),
      ingredients: this.rIngredients,
    });
  }
  onSave() {
    console.log(this.form);
  }
}
