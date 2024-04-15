import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit {
  username: string = '';
  email: string = '';
  password: string = '';
  registrationForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  register() {
    if (this.registrationForm.valid) {
      this.authService.logout();
      const userInfo: User = {
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
    } else {
      this.errorMessage = '* Please fill mandatory fields';
    }
  }
}
