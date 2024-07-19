import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { User } from '../model/user';
import { Movie } from '../model/movie';
import { catchError, mergeMap, of, tap, throwError } from 'rxjs';
import { MovieService } from '../services/movies.service';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { Reservation } from '../model/reservation';
import { UserService } from '../services/user.service';
import { forkJoin } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean = false;
  user: User;
  currentMovies: Movie[] = [];
  upcomingMovies: Movie[] = [];
  userReservations: Reservation[] = [];
  userMovies: Movie[] = [];
  showStar: boolean = false;
  hasAnsweredQuestionnaire: boolean = true;


  constructor(private movieService: MovieService, private authService: AuthService, private userService: UserService, private cdr: ChangeDetectorRef, private snackBar: MatSnackBar, private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
    this.fetchCurrentMoviesWithAvailability();
    this.fetchUpcomingMovies();
    this.checkQuestionnaireStatus();

  };

  checkQuestionnaireStatus(): void {
    const userName = localStorage.getItem("userName");
    if (userName) {
      this.userService.getUserByUserName(userName).subscribe(user => {
        this.hasAnsweredQuestionnaire = user.chosenMovie != null && user.hasKids != null;
        this.cdr.detectChanges();
      });
    }
  }

  redirectToQuestionnaire(): void {
    this.router.navigate(['/questionnaire']);
  }

  checkHighRecommendationRate() {
    const hasHighRecommendation = this.upcomingMovies.some(movie => movie.recommendationRateForUser !== undefined && movie.recommendationRateForUser > 7.0);
    this.showStar = hasHighRecommendation;
    this.cdr.detectChanges();
}

  private fetchCurrentMoviesWithAvailability(): void {
    forkJoin({
      currentMovies: this.fetchCurrentMovies(),
      userWithMovies: this.fetchUserWithBookedMovies()
    }).subscribe(
      ({ currentMovies, userWithMovies }) => {
        this.currentMovies = currentMovies;
        this.userMovies = userWithMovies.movies;
        this.updateCurrentMovies();
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }


  //  getTokenIfFromGoogle(): void { 
  //   // if (!this.authService.isLoggedIn) {
  //     console.log("fetching token")
  //     this.authService.getToken();
  //   // }
  //  } 


  private updateCurrentMovies(): void {
    this.currentMovies.forEach(movie => {
      const isBooked = this.userMovies.some(bookedMovie => bookedMovie.id === movie.id);
      movie.bookedForUser = isBooked;
    });
  }

  private fetchCurrentMovies(): Observable<any> {
    const userName = localStorage.getItem("userName");
    if (userName) {
      return this.userService.getUserByUserName(userName).pipe(
        mergeMap(user => this.movieService.fetchCurrentMovies(user.id)),
        catchError(error => {
          console.error('Error fetching user:', error);
          this.snackBar.open('Failed to load user data', 'Close', { duration: 3000 });
          return throwError(error);
        })
      );
    } else {
      console.error('User not found in localStorage');
      this.snackBar.open('Failed to load user data', 'Close', { duration: 3000 });
      return of([]);
    }
  }



  private fetchUserWithBookedMovies() {
    return this.userService.getUserByUserName(localStorage.getItem("userName"));
  }


  fetchUpcomingMovies(): void {
    const userName = localStorage.getItem("userName");
    if (userName) {
      this.userService.getUserByUserName(userName).pipe(
        mergeMap(user => this.movieService.fetchUpcomingMovies(user.id)),
        tap((movies: Movie[]) => {
          this.upcomingMovies = movies;
          this.checkHighRecommendationRate();
          console.log(this.upcomingMovies);
        }),
        catchError(error => {
          console.error('Error fetching upcoming movies:', error);
          this.snackBar.open('Failed to load upcoming movies data', 'Close', { duration: 3000 });
          return throwError(error);
        })
      ).subscribe();
    } else {
      console.error('User not found in localStorage');
      this.snackBar.open('Failed to load user data', 'Close', { duration: 3000 });
    }
  }

}
