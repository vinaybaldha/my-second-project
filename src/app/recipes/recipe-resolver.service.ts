import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Observable, Subscription, map, of, switchMap, take } from 'rxjs';
import * as fromAppResolve from '../store/app.reducer';
import * as fromRecipeActions from '../recipes/store/recipes.actions';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
@Injectable({
  providedIn: 'root',
})
export class RecipeResolver {
  constructor(
    private store: Store<fromAppResolve.AppState>,
    private actions$: Actions
  ) {}
  subscription: Subscription;
  recipes: Recipe[];
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    // const recipes = this.recipeService.getRecipe();

    // this.subscription = this.store
    //   .select('recipes')
    //   .pipe(map((recipeStore) => recipeStore.recipes))
    //   .subscribe((recipes: Recipe[]) => {
    //     this.recipes = recipes;
    //   });
    // if (this.recipes.length) {
    //   return this.recipes;
    // }
    // return this.dataStorageService.fatchData();

    return this.store.select('recipes').pipe(
      take(1),
      map((recipeStore) => recipeStore.recipes),
      switchMap((recipes) => {
        if (recipes.length == 0) {
          this.store.dispatch(new fromRecipeActions.FatchRecipes());
          return this.actions$.pipe(
            ofType(fromRecipeActions.SET_RECIPES),
            take(1)
          );
        } else {
          return of(recipes);
        }
      })
    );
  }
}
