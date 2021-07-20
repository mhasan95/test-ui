import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  role : string ='';
  message: string;

  constructor(public authService : DataService , public router : Router) {

    // redirect to home if already logged in
      if (localStorage.getItem('ROLE') == 'GUEST')  { 
        this.authService.isLoggedIn = true;
        this.router.navigate(['/todos']);
    }
    if( this.authService.isLoggedIn )
    this.router.navigate(['/todos']);
    this.message = this.getMessage();
   }

  ngOnInit(): void {
  }
  login() {
    this.message = 'Trying to log in ...';

    this.authService.login().subscribe(() => {
      this.message = this.getMessage();
      if (this.authService.isLoggedIn) {
        // Usually you would use the redirect URL from the auth service.
        // However to keep the example simple, we will always redirect to `/admin`.
        const redirectUrl = '/todos';

        // Redirect the user
        this.router.navigate([redirectUrl]);
      }
    });
  }
  getMessage() {
    return 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  logout() {
    this.authService.logout();
    this.message = this.getMessage();
  }

  loginGuest()
  {
   
    this.authService.isLoggedIn = true;
  //  this.dataService.role = 'Guest';
    localStorage.setItem('STATE', 'true');
    localStorage.setItem('ROLE',  'Guest');
    this.router.navigate(['/todos']);
  }

}
