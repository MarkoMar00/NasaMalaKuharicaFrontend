import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Recipe} from "../object-models/Recipe";
import {RecipeService} from "../services/recipe.service";
import {Ingredient} from "../object-models/Ingredient";
import {IngredientService} from "../services/ingredient.service";
import {UserCredentialsService} from "../services/user-credentials.service";
import {User} from "../object-models/User";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit{

  currentRecipe: Recipe | undefined;
  recipeIngredients: Ingredient[] = [];
  currentUser: User | undefined;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private ingredientService: IngredientService, private router: Router,
              private userCredentialsService: UserCredentialsService, private userService: UserService) {
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

    // @ts-ignore
    this.userService.getUserByUsername(this.route.snapshot.paramMap.get('user'))
      .subscribe(user => this.currentUser = user);
  }


  writeRecipe() {
    this.router.navigate(['/writeRecipe', this.currentUser?.username]);
  }

  logout() {
    this.userCredentialsService.logout();
  }

  goToMainPage() {
    this.router.navigate(['/main', this.currentUser?.username]);
  }

  goToProfile() {
    this.router.navigate(['/profile', this.currentUser?.username]);
  }
}
