import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {MainComponent} from "./main/main.component";
import {RegisterComponent} from "./register/register.component";
import {RecepyDetailComponent} from "./recepy-detail/recepy-detail.component";

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'main/:user', component:MainComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'recepyDetail/:id', component:RecepyDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
