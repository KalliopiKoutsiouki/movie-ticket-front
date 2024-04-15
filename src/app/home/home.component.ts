import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { Movie } from '../model/movie';
import { tap } from 'rxjs';
import { MovieService } from '../services/movies.service';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { Reservation } from '../model/reservation';
import { UserService } from '../services/user.service';
import { forkJoin } from 'rxjs';


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


  constructor(private movieService: MovieService, private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
    this.fetchCurrentMoviesWithAvailability();
    this.fetchUpcomingMovies();
  };

  private fetchCurrentMoviesWithAvailability(): void {
    forkJoin({
      currentMovies: this.fetchCurrentMovies(),
      userMovies: this.fetchUserWithBookedMovies()
    }).subscribe(
      ({ currentMovies, userMovies }) => {
        this.currentMovies = currentMovies;
        this.userMovies = userMovies.movies;
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

  //     getAllUsers() : void {
  //     this.userService.getAllUsers()
  //     .pipe(
  //       tap((users: User[]) => {
  //         this.users = users;
  //         console.log(this.users)
  //       }),

  //     )
  //     .subscribe();
  // }


  //   getAllMovies() : void {
  //     this.movieService.getAllMovies()
  //     .pipe(
  //       tap((movies: Movie[]) => {
  //         this.movies = movies;
  //         console.log(this.movies);
  //       }),

  //     )
  //     .subscribe();
  // }


  private updateCurrentMovies(): void {
    this.currentMovies.forEach(movie => {
      const isBooked = this.userMovies.some(bookedMovie => bookedMovie.id === movie.id);
      movie.bookedForUser = isBooked;
    });
  }

  private fetchCurrentMovies() {
    return this.movieService.fetchCurrentMovies();
  }

  private fetchUserWithBookedMovies() {
    return this.userService.getUserByUserName(localStorage.getItem("userName"));
  }


  fetchUpcomingMovies(): void {
    this.movieService.fetchUpcomingMovies()
      .pipe(
        tap((movies: Movie[]) => {
          this.upcomingMovies = movies;
        }),
      )
      .subscribe();
  }

}
