import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { Movie } from '../model/movie';
import { tap} from 'rxjs';
import { MovieService } from '../services/movies.service';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  isLoggedIn$: Observable<boolean>;
  user: User;
  movies: Movie[] = [];
 

  constructor(private movieService: MovieService, private authService: AuthService){}

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn();
    this.getAllMovies();
    
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


  getAllMovies() : void {
    this.movieService.getAllMovies()
    .pipe(
      tap((movies: Movie[]) => {
        this.movies = movies;
        console.log(this.movies);
      }),
      
    )
    .subscribe();
}
}
