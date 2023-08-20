import {Component, OnInit} from '@angular/core';
import {User} from "../User";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../user.service";
import {Recipe} from "../Recipe";
import {RecipeService} from "../recipe.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{

  currentUser: User | undefined;
  recipes: Recipe[] = [];


  constructor(private route: ActivatedRoute, private userService: UserService, private recepyService: RecipeService, private router: Router) {}

  ngOnInit(): void {
    // @ts-ignore
    this.userService.getUserByUsername(this.route.snapshot.paramMap.get('user'))
      .subscribe(user => this.currentUser = user);

    this.recepyService.getAllRecipes()
      .subscribe(recipes => this.recipes = recipes);
  }

  recipeDetails(id: number){
    this.router.navigate(['/recipeDetail', id]);
  }

  writeRecipe() {
    this.router.navigate(['/writeRecipe']);
}

  logout() {
    this.router.navigate(['/']);
  }

}
