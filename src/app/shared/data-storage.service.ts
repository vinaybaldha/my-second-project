import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  saveData() {
    const recipe = this.recipeService.getRecipe();
    this.http
      .put(
        'https://my-second-project-58528-default-rtdb.firebaseio.com/recipes.json',
        recipe
      )
      .subscribe((response) => {
        console.log(response);
      });
  }
  fatchData() {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http.get<Recipe[]>(
          'https://my-second-project-58528-default-rtdb.firebaseio.com/recipes.json',
          {
            params: new HttpParams().set('auth', user._token),
          }
        );
      }),
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients
              ? recipe.ingredients
              : (recipe.ingredients = []),
          };
        });
      }),
      tap((recipes) => {
        this.recipeService.setRecipe(recipes);
      })
    );
  }
}
