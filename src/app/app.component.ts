import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'movie-ticket-front';
  currentUser = null;
  isLoggedIn: boolean;
  constructor(private userService: UserService, private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
    // this.authService.isLoggedIn().subscribe((loggedIn: boolean) => {
    //   this.isLoggedIn = loggedIn;
    // });
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isLoggedIn = !['/login', '/register'].includes(event.url);
    });
  }
  // const code = this.route.snapshot.queryParamMap.get('code');
  // console.log(code);
  // console.log(this.route)
  // this.route.queryParamMap.subscribe(params => {
  //   const code = params.get('code');
  //     if (code !== undefined) {
    //   }
    // })
  

  // ngOnInit(): void {
  //   const code = this.getQueryParam('code');
  //   this.authService.getGoogleToken(code).subscribe(  (response) => {
  //     // Save the token to localStorage
  //     this.authService.setAccessToken(response.token, "google-user");
  //     console.log('Token saved to localStorage:', response.token)
  //     this.router.navigate(['/home']);
  //   });
  // }


//   getQueryParam(key): string {
//     const queryString = window.location.search;
//     const urlParams = new URLSearchParams(queryString);
//     return urlParams.get(key);
// }
}
