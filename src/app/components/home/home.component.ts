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
      this.profile = profile;
      this.profileCargado = true;

      _afs.obtenerGrupos().subscribe((data:any)=>{
        this.grupos = data;
        let vinculos:any[];
        //abrimos for para obtener las materias dominadas por cada grupo
        for (let i = 0; i < data.length; i++) {
          let grupo = data[i];
          _afs.obtenerMateriasDominadasDeGrupo(this.grupos[i].id).subscribe((materias:any)=>{
            //materiasDominadas no estaba inicializada pero existe en la interfaz, aquí inicializamos
            // su valor
            this.grupos[i].materiasDominadas = materias;
          })
          _afs.obtenerIntegrantesDeGrupo(this.grupos[i].id).subscribe((integrantes:any)=>{
            //integrantes no estaba inicializada pero existe en la interfaz, aquí inicializamos
            // su valor
            this.grupos[i].integrantes = integrantes;
            for (let x = 0; x < integrantes.length; x++) {
              const integrante = integrantes[x];
              if (integrante.usuario == this.profile.sub) {
                this.grupos[i].unido =true
                continue;
              }
              this.grupos[i].unido = false;
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
