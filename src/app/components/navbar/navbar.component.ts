import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loggeado:boolean = false;
  constructor(public _authService:AuthService) {
    _authService.handleAuthentication();
    this.loggeado = this._authService.isAuthenticated();
   }

  ngOnInit() {
  }
  login(){
    this._authService.login();
  } 
  logout(){
    this._authService.logout();
    window.location.href = '/';
  }
}


