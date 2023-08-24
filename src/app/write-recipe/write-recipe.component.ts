import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Recipe} from "../object-models/Recipe";
import {ActivatedRoute, Router} from "@angular/router";
import {formatDate} from "@angular/common";
import {Ingredient} from "../object-models/Ingredient";
import {User} from "../object-models/User";
import {UserService} from "../services/user.service";
import {RecipeService} from "../services/recipe.service";
import {IngredientService} from "../services/ingredient.service";

@Component({
  selector: 'app-write-recipe',
  templateUrl: './write-recipe.component.html',
  styleUrls: ['./write-recipe.component.css']
})
export class WriteRecipeComponent implements OnInit{

  newRecipe: Recipe = new Recipe();
  currentUser: User = new User();
  ingredients: Ingredient[] = [];
  ingredientName: string = '';
  ingredientAmount: string = '';
  ingredientUnit: string = '';

  ngOnInit(): void {
    // @ts-ignore
    this.userService.getUserByUsername(this.route.snapshot.paramMap.get('user'))
      .subscribe(user => {this.currentUser = user;
        console.log(this.currentUser.name);});

    // @ts-ignore
    this.newRecipe.portions = null;
    // @ts-ignore
    this.newRecipe.preparationTimeMinutes = null;

    console.log(this.ingredients.length)
  }

  constructor(private router : Router, private userService: UserService, private recipeService: RecipeService, private ingredientService: IngredientService, private route: ActivatedRoute) {
  }

  onSubmit(recipeForm: NgForm) {
    if (recipeForm.valid && this.ingredients.length > 0){
      let dateString = formatDate(Date.now(), 'yyyy-MM-dd', 'en-US');
      this.newRecipe.date = dateString;


      this.recipeService.saveRecipe(this.currentUser.id, this.newRecipe)
        .subscribe(
          recipe => {
            for (let ingredient of this.ingredients) {
              // @ts-ignore
              this.ingredientService.saveIngredient(recipe.id, ingredient)
                .subscribe();
            }
          }
        );

      setTimeout(() => {
        this.router.navigate(['/main', this.currentUser.username]);
      }, 1000);
    }
    else if (this.ingredients.length < 1){
      const el = document.createElement('div');
      el.innerHTML = `
        <span style="color: red">
            Unesite bar jedan sastojak!
        </span>
      `;

      const err = document.getElementById('err');
      err?.appendChild(el);
      console.log('invalid');
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
      console.log('invalid');
    }
  }

  logout() {
    this.router.navigate(['/']);
  }

  addIngredient(ingredientForm: NgForm) {
    if (ingredientForm.valid){

      let newIngredient: Ingredient = new Ingredient();
      newIngredient.name = this.ingredientName;
      newIngredient.amount = Number(this.ingredientAmount);
      newIngredient.unit = this.ingredientUnit;
      this.ingredients.push(newIngredient);

      this.ingredientName = '';
      this.ingredientAmount = '';
      this.ingredientUnit = '';
      console.log(this.ingredients);

    }
  }
}
