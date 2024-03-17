import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OAuthCallbackComponentComponent } from './oauth-callback-component/oauth-callback-component.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: 'home/login/oauth2/code/google', component: HomeComponent },
  // { path: 'home/login/oauth2/code/google', component: OAuthCallbackComponentComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
