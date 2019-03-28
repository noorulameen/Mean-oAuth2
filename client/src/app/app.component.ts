import { Component } from '@angular/core';
import { Router, CanActivate } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  log = (localStorage.getItem('currentUser'))? 'logout': 'login'
  
}
