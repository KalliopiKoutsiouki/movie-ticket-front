import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-oauth-callback-component',
  templateUrl: './oauth-callback-component.component.html',
  styleUrl: './oauth-callback-component.component.css'
})
export class OAuthCallbackComponentComponent implements OnInit {
 
  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params["code"] !== undefined) {
        this.authService.getGoogleToken(params["code"]).subscribe(  (response) => {
          // Save the token to localStorage
          this.authService.setAccessToken(response.body.token, "google-user");
          console.log('Token saved to localStorage:', response.body.token)
          this.router.navigate(['/home']);
        });
      }
    })
    // this.authService.getGoogleToken().subscribe({
    //   next: (data) => {
    //     console.log('Access Token:', data.accessToken);
    //     this.authService.setAccessToken(data.accessToken, "google-user");
    //     this.router.navigate(['/home']);
    //   },
    //   error: (error) => {
    //     console.error('Error fetching access token:', error);
    //   }
    // });
}
}
