import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Recipe} from "../object-models/Recipe";
import {RecipeService} from "../services/recipe.service";
import {Ingredient} from "../object-models/Ingredient";
import {IngredientService} from "../services/ingredient.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit{

  currentRecipe: Recipe | undefined;
  recipeIngredients: Ingredient[] = [];

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private ingredientService: IngredientService, private router: Router) {
  }

  ngOnInit(): void {
    this.recipeService.getRecipeById(Number(this.route.snapshot.paramMap.get('id')))
      .subscribe(
        recepy => this.currentRecipe = recepy
      );

    this.ingredientService.getIngredientsByRecipeId(Number(this.route.snapshot.paramMap.get('id')))
      .subscribe(
        ingredients => this.recipeIngredients = ingredients
      );
  }


  writeRecipe() {
    this.router.navigate(['/writeRecipe']);
  }

  logout() {
    this.router.navigate(['/']);
  }
}
