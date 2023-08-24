import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {MainComponent} from "./main/main.component";
import {RegisterComponent} from "./register/register.component";
import {RecipeDetailComponent} from "./recipe-detail/recipe-detail.component";
import {WriteRecipeComponent} from "./write-recipe/write-recipe.component";
import {ProfileComponent} from "./profile/profile.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {authGuard} from "./auth.guard";

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'main/:user', component:MainComponent, canActivate: [authGuard]},
  {path: 'register', component:RegisterComponent},
  {path: 'recipeDetail/:id', component:RecipeDetailComponent, canActivate: [authGuard]},
  {path: 'writeRecipe/:user', component:WriteRecipeComponent, canActivate: [authGuard]},
  {path: 'profile/:user', component: ProfileComponent, canActivate: [authGuard]},
  {path: 'edit/:user/:recipe', component: RecipeEditComponent, canActivate: [authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
