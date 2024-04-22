import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OAuthCallbackComponentComponent } from './oauth-callback-component/oauth-callback-component.component';
import { RegistrationComponent } from './registration/registration.component';
import { HallAdminComponent } from './hall-admin/hall-admin.component';
import { ProfileComponent } from './profile/profile.component';
import { UserAdminComponent } from './user-admin/user-admin.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: 'home/login/oauth2/code/google', component: HomeComponent },
  // { path: 'home/login/oauth2/code/google', component: OAuthCallbackComponentComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'register', component: RegistrationComponent},
  { path: 'admin/hall', component: HallAdminComponent},
  { path: 'admin/users', component: UserAdminComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
