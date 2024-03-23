import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent implements OnInit{
  @Input() user: any; 
  isLoggedIn$: Observable<boolean>;
  constructor(private router: Router, private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn();
   console.log(this.user);
  }
  logout() {
    // Call your authentication service's logout method
    this.authService.logout();
    // Redirect to the login page or any other desired page
    this.router.navigate(['/login']);
  }

}
