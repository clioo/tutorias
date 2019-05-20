import { Component } from '@angular/core';
import { Grupos } from '../../interface/grupos.interface';
import { RealtimeFirebaseService } from '../../services/realtime-firebase.service';
import { FirestoreFirebaseService } from '../../services/firestore-firebase.service';
import { AuthService } from '../../services/auth.service';
 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public grupos:Grupos[] = [];
  gruposCargados:boolean = false;
  profile:any;
  profileCargado:boolean = false;
  constructor(public _afs:FirestoreFirebaseService, _authService:AuthService) {

    _authService.getProfile((err,profile)=>{
      console.log(profile)
      this.profile = profile;
      this.profileCargado = true;

      _afs.obtenerGrupos().subscribe((data:any)=>{
        this.grupos = data;
        //abrimos for para obtener las materias dominadas por cada grupo
        for (let i = 0; i < data.length; i++) {

          _afs.obtenerMateriasDominadasDeGrupo(this.grupos[i].id).subscribe((data:any)=>{
            //materiasDominadas no estaba inicializada pero existe en la interfaz, aquí inicializamos
            // su valor
            this.grupos[i].materiasDominadas = data;
          })
          _afs.obtenerIntegrantesDeGrupo(this.grupos[i].id).subscribe((integrantes:any)=>{
            //integrantes no estaba inicializada pero existe en la interfaz, aquí inicializamos
            // su valor
            this.grupos[i].integrantes = integrantes;
            //iteramos los integrantes para eliminar grupo si el usuario ya está unido a este
            for (let x = 0; x < integrantes.length; x++) {
              if (this.profile.sub == integrantes[x].usuario) {
                this.grupos.splice(i,1);
              }
              
            }
          })
    
        }
  
   
        this.gruposCargados = true;
   
      })




    });
  }

  unirseGrupo(idGrupo:string){
    let objeto = {
      rol:'integrante',
      usuario:this.profile.sub
    }
    this._afs.agregarIntegranteGrupo(idGrupo,objeto).then(()=>{
      alert('Te haz unido con éxito.')
    })
  }

}
