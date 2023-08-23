import {Component, OnInit} from '@angular/core';
import {Recipe} from "../Recipe";
import {User} from "../User";
import {Ingredient} from "../Ingredient";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../user.service";
import {RecipeService} from "../recipe.service";
import {IngredientService} from "../ingredient.service";
import {NgForm} from "@angular/forms";

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

  constructor(private router : Router, private userService: UserService, private recipeService: RecipeService, private ingredientService: IngredientService, private route: ActivatedRoute) {
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
    this.router.navigate(['/']);
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
}
