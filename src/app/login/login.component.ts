import { Component, OnInit } from '@angular/core';
import { AuthService} from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  url: string = "";

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // this.authService.loginUrlForGoogle().subscribe((data:any) =>{
    //   this.url = data.url;
    // })
  }

  login() {
    // Call your authentication service to handle login with username and password
    this.authService.login(this.username, this.password);
  }

  // loginWithGoogle() {
  //   this.authService.loginWithGoogle().subscribe(
  //     (response) => {
  //       // Handle successful login response
  //       console.log('Google login successful:', response);
  //     },
  //     (error) => {
  //       // Handle error
  //       console.error('Error during Google login:', error);
  //     }
  //   );
  // }

}
