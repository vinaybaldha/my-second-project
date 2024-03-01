import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from '../../shared/ingredient.model';
import { Recipe } from '../recipe.model';
import { Store } from '@ngrx/store';
import * as fromAppReducer from '../../store/app.reducer';
import { Subscription, map } from 'rxjs';
import * as fromRecipeActions from '../store/recipes.actions';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css',
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  id!: number;
  editMode = false;
  ingredients!: Ingredient[];
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromAppReducer.AppState>
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
      // this.recipeService.onUpdateRecipe(this.id, recipe);
      this.store.dispatch(
        new fromRecipeActions.UpdateRecipe({ index: this.id, recipe: recipe })
      );
    } else {
      // this.recipeService.onAddRecipe(recipe);
      this.store.dispatch(new fromRecipeActions.AddRecipe(recipe));
    }
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray<FormGroup>([]);

    if (this.editMode) {
      // const recipe = this.recipeService.getRecipeById(this.id);
      let recipe: Recipe = null;
      this.subscription = this.store
        .select('recipes')
        .pipe(map((recipesStore) => recipesStore.recipes))
        .subscribe((recipes) => {
          recipe = recipes.find((recipe, index) => {
            return this.id == index;
          });
        });
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
  }
  get ingredientCntr() {
    return (<FormArray>this.form.get('ingredients')).controls;
  }
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  onDeleteIngredient(index: number) {
    (<FormArray>this.form.get('ingredients')).removeAt(index);
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
