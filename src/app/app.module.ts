import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
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
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrationComponent } from './registration/registration.component';
import { ModalModule } from './modal/modal.module';
import { MatNativeDateModule, DateAdapter , MAT_DATE_LOCALE } from '@angular/material/core';
import { ReservationTableComponent } from './reservation-table/reservation-table.component';
import { HallAdminComponent } from './hall-admin/hall-admin.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AddHallComponent } from './add-hall/add-hall.component';
import { EditHallComponent } from './edit-hall/edit-hall.component';
import { MatInputModule } from '@angular/material/input';
import { ProfileComponent } from './profile/profile.component';
import { UserAdminComponent } from './user-admin/user-admin.component';
import { CheckerComponent } from './checker/checker.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MovieTableComponent,
    NavigationBarComponent,
    OAuthCallbackComponentComponent,
    RegistrationComponent,
    ReservationTableComponent,
    HallAdminComponent,
    AddHallComponent,
    EditHallComponent,
    ProfileComponent,
    UserAdminComponent,
    CheckerComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterOutlet,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatTabsModule,
    BrowserAnimationsModule,
    ModalModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule
  ],
  providers: [AuthService, UserService, MovieService,  { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }, provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
