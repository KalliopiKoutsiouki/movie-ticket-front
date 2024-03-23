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
  user:any = null;
  isLoggedIn$: Observable<boolean>;
  constructor(private router: Router, private authService: AuthService, private userService: UserService) { }
  isDropdownOpen: boolean = false;

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn();
    this.user = this.authService.getCurrentUser();
    console.log(this.user);
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout() {
    // Call your authentication service's logout method
    this.authService.logout();
    // Redirect to the login page or any other desired page
    this.router.navigate(['/login']);
  }

  login () {
    this.router.navigate(['/login']);
  }

  register() {
    this.logout();
    this.router.navigate(['/register']);
  }

}
