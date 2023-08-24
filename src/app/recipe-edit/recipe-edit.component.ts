import {Component, OnInit} from '@angular/core';
import {Recipe} from "../object-models/Recipe";
import {User} from "../object-models/User";
import {Ingredient} from "../object-models/Ingredient";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {RecipeService} from "../services/recipe.service";
import {IngredientService} from "../services/ingredient.service";
import {NgForm} from "@angular/forms";
import {UserCredentialsService} from "../services/user-credentials.service";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  currentRecipe: Recipe = new Recipe();
  currentUser: User = new User();
  currentIngredients: Ingredient[] = [];
  newIngredients: Ingredient[] = [];
  ingredientName: string = '';
  ingredientAmount: string = '';
  ingredientUnit: string = '';


  ngOnInit(): void {
    // @ts-ignore
    this.userService.getUserByUsername(this.route.snapshot.paramMap.get('user'))
      .subscribe(user => this.currentUser = user);

    // @ts-ignore
    this.recipeService.getRecipeById(this.route.snapshot.paramMap.get('recipe'))
      .subscribe(recipe => {
        this.currentRecipe = recipe;
        // @ts-ignore
        this.ingredientService.getIngredientsByRecipeId(this.currentRecipe.id)
          .subscribe(ingredients => this.currentIngredients = ingredients);
      });
  }

  constructor(private router : Router, private userService: UserService, private recipeService: RecipeService,
              private ingredientService: IngredientService, private route: ActivatedRoute,
              private userCredentialsService: UserCredentialsService) {
  }

  onSubmit(recipeForm: NgForm) {
    if (recipeForm.valid && (this.currentIngredients.length > 0 || this.newIngredients.length > 0)){

      this.recipeService.updateRecipe(this.currentRecipe.id, this.currentRecipe)
        .subscribe(
          recipe => {
            let ingredientNames: string[] = [];
            for (let ingredient of this.currentIngredients) {
              ingredientNames.push(ingredient.name)
            }

            for (let newIngredient of this.newIngredients) {
              if (!ingredientNames.includes(newIngredient.name)) {
                // @ts-ignore
                this.ingredientService.saveIngredient(recipe.id, newIngredient)
                  .subscribe();
                console.log("uspjeh");
              }
            }
          }
        );



      setTimeout(() => {
        this.router.navigate(['/main', this.currentUser.username]);
      }, 1000);
    }
    else if (this.currentIngredients.length < 1 || this.newIngredients.length < 1){
      const el = document.createElement('div');
      el.innerHTML = `
        <span style="color: red">
            Unesite bar jedan sastojak!
        </span>
      `;

      const err = document.getElementById('err');
      err?.appendChild(el);
    }

    else {
      const el = document.createElement('div');
      el.innerHTML = `
        <span style="color: red">
            Krivo ste unijeli podatke!
        </span>
      `;

      const err = document.getElementById('err');
      err?.appendChild(el);
    }
  }

  logout() {
    this.userCredentialsService.logout();
  }

  addIngredient(ingredientForm: NgForm) {
    if (ingredientForm.valid){

      let newIngredient: Ingredient = new Ingredient();
      newIngredient.name = this.ingredientName;
      newIngredient.amount = Number(this.ingredientAmount);
      newIngredient.unit = this.ingredientUnit;
      this.newIngredients.push(newIngredient);

      this.ingredientName = '';
      this.ingredientAmount = '';
      this.ingredientUnit = '';
    }
  }

  removeIngr(id: number) {
    for (let i = 0; i < this.currentIngredients.length; i++) {
      if (this.currentIngredients[i].id == id) {
        this.currentIngredients.splice(i, 1);
        this.ingredientService.deleteIngredient(id)
          .subscribe();
      }
    }
  }

  goToMainPage() {
    this.router.navigate(['/main', this.currentUser?.username]);
  }

  goToProfile() {
    this.router.navigate(['/profile', this.currentUser?.username]);
  }

  writeRecipe() {
    this.router.navigate(['/writeRecipe', this.currentUser?.username]);
  }
}
