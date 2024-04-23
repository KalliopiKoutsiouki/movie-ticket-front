import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../model/user';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent implements OnInit {
  user: any = null;
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  constructor(private router: Router, private authService: AuthService, private userService: UserService) { }
  isDropdownOpen: boolean = false;

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
    this.user = this.authService.getCurrentUser();
    this.userService.getUserByUserName(this.user.username).subscribe(
      (user: User) => {
        this.isAdmin = user.userRoles.includes('ROLE_ADMIN') || user.userRoles.includes('ROLE_SUPERADMIN');
      },
      (error) => {
        console.error('Error fetching user:', error);
      }
    );
    console.log(this.user);
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  login() {
    this.router.navigate(['/login']);
  }

  register() {
    this.logout();
    this.router.navigate(['/register']);
  }

}
