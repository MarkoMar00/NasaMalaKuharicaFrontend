import {Component, OnInit} from '@angular/core';
import {User} from "../object-models/User";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {Recipe} from "../object-models/Recipe";
import {RecipeService} from "../services/recipe.service";
import {UserCredentialsService} from "../services/user-credentials.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{

  currentUser: User | undefined;
  recipes: Recipe[] = [];
  filter = '';
  filteredRecipes: Recipe[] = [];
  nonFilteredRecipes: Recipe[] = [];


  constructor(private route: ActivatedRoute, private userService: UserService, private recipeService: RecipeService, private router: Router,
              private userCredentialsService: UserCredentialsService) {}

  ngOnInit(): void {
    // @ts-ignore
    this.userService.getUserByUsername(this.route.snapshot.paramMap.get('user'))
      .subscribe(user => this.currentUser = user);

    this.recipeService.getAllRecipes()
      .subscribe(recipes => {
        this.recipes = recipes;
        this.nonFilteredRecipes = recipes;
      });

  }

  recipeDetails(id: number){
    this.router.navigate(['/recipeDetail', id, this.currentUser?.username]);
  }

  writeRecipe() {
    this.router.navigate(['/writeRecipe', this.currentUser?.username]);
}

  logout() {
    this.userCredentialsService.logout();
  }

  goToProfile() {
    this.router.navigate(['/profile', this.currentUser?.username]);
  }

  onFilterChange() {
    this.filterRecipes();
  }

  filterRecipes() {

    if (this.filter == ''){
      this.filteredRecipes = [];
      this.nonFilteredRecipes = this.recipes;
    }

    else {
      this.filteredRecipes = this.recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(this.filter.toLowerCase())
      );
      this.nonFilteredRecipes = this.recipes.filter(recipe =>
        !recipe.name.toLowerCase().includes(this.filter.toLowerCase())
      );
    }
  }
}
