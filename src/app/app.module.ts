import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { MovieService } from './services/movies.service';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent} from './home/home.component';
import { OAuthCallbackComponentComponent } from './oauth-callback-component/oauth-callback-component.component';
import { MovieTableComponent } from './movie-table/movie-table.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrationComponent } from './registration/registration.component';
// import { MatCheckboxModule } from '@angular/material/checkbox';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MovieTableComponent,
    NavigationBarComponent,
    OAuthCallbackComponentComponent,
    RegistrationComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterOutlet,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTabsModule,
    BrowserAnimationsModule
    // MatDatepickerModule,
    // MatCheckboxModule,
    // MatInputModule
  ],
  providers: [AuthService, UserService, MovieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
