import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../model/user';
import { Movie } from '../model/movie';
import { ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';
import { tap} from 'rxjs';
import { MovieService } from '../services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  user: User;
  movies: Movie[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService, private userService: UserService, private movieService: MovieService){}

  ngOnInit(): void {
    this.getUserName();
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

  getUserName(): void {
    const userDetails = this.authService.getCurrentUser();
    const name = userDetails.username;
    const userId =  1;
    this.userService.getUserByUserName(name).subscribe(user => {
      this.user = user;
  })
}

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
