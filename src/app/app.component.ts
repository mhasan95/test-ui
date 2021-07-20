import { Component } from '@angular/core';
import { DataService } from './data.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TestApp';
  constructor(public dataservice: DataService, private router :Router){}
  logout(): void {

    console.log('logged out');
    localStorage.removeItem('ROLE');
    this.dataservice.isLoggedIn = false;

    this.router.navigate(['/']);
  }
}
