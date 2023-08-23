import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {MainComponent} from "./main/main.component";
import {RegisterComponent} from "./register/register.component";
import {RecipeDetailComponent} from "./recipe-detail/recipe-detail.component";
import {WriteRecipeComponent} from "./write-recipe/write-recipe.component";
import {ProfileComponent} from "./profile/profile.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'main/:user', component:MainComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'recipeDetail/:id', component:RecipeDetailComponent},
  {path: 'writeRecipe/:user', component:WriteRecipeComponent},
  {path: 'profile/:user', component: ProfileComponent},
  {path: 'edit/:user/:recipe', component: RecipeEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
