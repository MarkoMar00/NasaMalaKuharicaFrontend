import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import {FormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { RegisterComponent } from './register/register.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { WriteRecipeComponent } from './write-recipe/write-recipe.component';
import { ProfileComponent } from './profile/profile.component';
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {RequestInterceptorInterceptor} from "./request-interceptor.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    RegisterComponent,
    RecipeDetailComponent,
    WriteRecipeComponent,
    ProfileComponent,
    RecipeEditComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
