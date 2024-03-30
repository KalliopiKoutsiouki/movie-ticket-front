import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { Movie } from '../model/movie';
import { tap} from 'rxjs';
import { MovieService } from '../services/movies.service';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { Reservation } from '../model/reservation';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  isLoggedIn$: Observable<boolean>;
  user: User;
  currentMovies: Movie[] = [];
  upcomingMovies: Movie[] = [];
  userReservations: Reservation[] = [];
 

  constructor(private movieService: MovieService, private authService: AuthService, private userService: UserService ){}

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn();
    this.fetchCurrentMovies();
    this.fetchUpcomingMovies();
    
 };

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

fetchCurrentMovies() : void {
  this.movieService.fetchCurrentMovies()
  .pipe(
    tap((movies: Movie[]) => {
      this.currentMovies = movies;
    }),
    
  )
  .subscribe();
}

fetchUpcomingMovies() : void {
  this.movieService.fetchUpcomingMovies()
  .pipe(
    tap((movies: Movie[]) => {
      this.upcomingMovies = movies;
    }),
    
  )
  .subscribe();
}


}
