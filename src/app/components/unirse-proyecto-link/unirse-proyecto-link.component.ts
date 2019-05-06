import { Component, OnInit } from '@angular/core';
import { FirestoreFirebaseService } from '../../services/firestore-firebase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-unirse-proyecto-link',
  templateUrl: './unirse-proyecto-link.component.html',
  styleUrls: ['./unirse-proyecto-link.component.css']
})
export class UnirseProyectoLinkComponent implements OnInit {
  profile:any;
  unido:boolean = false;
  constructor(private router:Router, private _authService:AuthService, private activatedRoute:ActivatedRoute, private _fsService:FirestoreFirebaseService) { }

  ngOnInit() {
    if (this._authService.userProfile) {
      this.profile = this._authService.userProfile;
      this.updateColection();
      } else {
      this._authService.getProfile((err, profile) => {
        this.profile = profile;
        this.updateColection();
      });
    }
  }
  updateColection(){
    this.activatedRoute.params.subscribe(params=>{
      this._fsService.updateDocumentoEnColeccionDeProyecto(
        params['idProyecto'], 'roles', params['idRol'],
        {
          usuario:this.profile.sub
        }
      ).then(data=>{
        this.router.navigate(['/tus-proyectos'])
      }).catch(err=>console.log(err));
    })
  }

}
