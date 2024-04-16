import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  user: User;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      id: [null],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      firstName: [''],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      mobilePhone: ['', Validators.required]
    });

   
    this.fetchUserData().subscribe(user => {
      this.user = user;
      if (this.user) {
        this.profileForm.patchValue(this.user);
      }
    });
    
  }

  fetchUserData() {
    return this.userService.getUserByUserName(localStorage.getItem("userName"));
  }

  saveProfile() {
    if (this.profileForm.valid) {
      this.user = { ...this.profileForm.value };
      this.userService.updateUser(this.user.id, this.user).subscribe(
        data => {
          console.log( data);
        },
        error => {
          console.log( error);
          // Handle error here
        }
      )
      console.log('User data saved:', this.user);
    } else {
      this.errorMessage = "Invalid data"
    }
  }
}

