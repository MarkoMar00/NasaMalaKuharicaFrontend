import {Component, OnInit} from '@angular/core';
import {User} from "../object-models/User";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {Recipe} from "../object-models/Recipe";
import {RecipeService} from "../services/recipe.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{

  currentUser: User | undefined;
  recipes: Recipe[] = [];


  constructor(private route: ActivatedRoute, private userService: UserService, private recipeService: RecipeService, private router: Router) {}

  ngOnInit(): void {
    // @ts-ignore
    this.userService.getUserByUsername(this.route.snapshot.paramMap.get('user'))
      .subscribe(user => this.currentUser = user);

    this.recipeService.getAllRecipes()
      .subscribe(recipes => this.recipes = recipes);
  }

  recipeDetails(id: number){
    this.router.navigate(['/recipeDetail', id]);
  }

  writeRecipe() {
    this.router.navigate(['/writeRecipe', this.currentUser?.username]);
}

  logout() {
    this.router.navigate(['/']);
  }

  goToProfile() {
    this.router.navigate(['/profile', this.currentUser?.username]);
  }
}
