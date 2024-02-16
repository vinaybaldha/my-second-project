import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Ingredient } from '../../shared/ingredient.model';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css',
})
export class RecipeEditComponent implements OnInit {
  form!: FormGroup;
  id!: number;
  editMode = false;
  ingredients!: Ingredient[];

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onSave() {
    const recipe = new Recipe(
      this.form.value['name'],
      this.form.value['description'],
      this.form.value['imagePath'],
      this.form.value['ingredients']
    );
    if (this.editMode) {
      this.recipeService.onUpdateRecipe(this.id, recipe);
    } else {
      this.recipeService.onAddRecipe(recipe);
    }
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray<FormGroup>([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipeById(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        this.ingredients = recipe.ingredients;
        for (let ingredient of recipe.ingredients) {
          let item = new FormGroup({
            name: new FormControl(ingredient.name, Validators.required),
            amount: new FormControl(ingredient.amount, [
              Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/),
            ]),
          });
          recipeIngredients.push(item);
        }
      }
    }
    this.form = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients,
    });
  }
  onIngredientAdd() {
    let item = new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required),
    });

    (this.form.get('ingredients') as FormArray).push(item);

    console.log(this.form.value);
  }
  get ingredientCntr() {
    return (<FormArray>this.form.get('ingredients')).controls;
  }
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
