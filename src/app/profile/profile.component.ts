import {Component, OnInit} from '@angular/core';
import {User} from "../User";
import {Recipe} from "../Recipe";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../user.service";
import {RecipeService} from "../recipe.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  currentUser: User | undefined;
  recipes: Recipe[] = [];

  constructor(private route: ActivatedRoute, private userService: UserService, private recipeService: RecipeService, private router: Router) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.userService.getUserByUsername(this.route.snapshot.paramMap.get('user'))
      .subscribe(user => {
        this.currentUser = user;

        this.recipeService.getAllRecipesFromUser(user.id)
          .subscribe(recipes => this.recipes = recipes);
      });
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

  editRecipe(userId: string | undefined, recipeId: number) {
    this.router.navigate(['/edit', userId, recipeId]);
  }

  deleteRecipe(recipeId: number) {
    this.recipeService.deleteRecipe(recipeId)
      .subscribe(r => {
        window.location.reload();
      });

  }
}
