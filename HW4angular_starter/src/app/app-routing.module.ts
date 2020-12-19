import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './_services/auth-guard.service';
import {RegisterComponent} from './register/register.component';
import {SettingsComponent} from './settings/settings.component';
import {CreateComponent} from "./create/create.component";
import {EditComponent} from "./edit/edit.component";
import {RankingsComponent} from "./rankings/rankings.component";
import {GraphicsComponent} from "./graphics/graphics.component";

const routes: Routes = [{path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},{ path: 'register', component: RegisterComponent },
  {path: 'settings', component: SettingsComponent}, {path: 'graphics', component: GraphicsComponent},
  {path: 'create', component: CreateComponent}, {path: 'edit', component: EditComponent},
  {path: 'settleup', component: RankingsComponent}, { path: '**', redirectTo: '' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
