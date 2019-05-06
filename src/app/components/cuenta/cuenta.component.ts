import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
 
@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit {
  profile:any;
  constructor(public _authService:AuthService) { }

  ngOnInit() {
    if (this._authService.userProfile) {
      this.profile = this._authService.userProfile;
    } else {
      this._authService.getProfile((err, profile) => {
        this.profile = profile;
        console.log(profile);
      });
    }
  }

}
