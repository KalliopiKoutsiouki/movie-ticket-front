import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit{
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private userService:UserService, private router:Router, private authService: AuthService ) { }

  ngOnInit(): void {
    
  }

  register() {
    this.authService.logout();
    const userInfo:User = {
      userName: this.username,
      password: this.password,
      email: this.email,
    }
    this.userService.registerUser(userInfo).subscribe(
      data => {
        console.log('User added successfully', data);
        this.authService.login(userInfo.userName, userInfo.password);
      },
      error => {
        console.log('Error adding user', error);
        // Handle error here
      }
    );
  }
  
}
