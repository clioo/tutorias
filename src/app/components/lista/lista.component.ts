import { Component, OnInit } from '@angular/core';
import { FirestoreFirebaseService } from '../../services/firestore-firebase.service';
import { Grupos } from '../../interface/grupos.interface';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  public grupos:Grupos[] = [];
  gruposCargados:boolean = false;
  profileCargado:boolean = false;
  grupoEscogido:any;
  clases:any[] = [];
  ngOnInit() {
  }
  public cambiarEscogido(indice:any){
    this._afs.obtenerClasesDeGrupoo(this.grupos[indice].id).subscribe((data:any)=>{
      console.log(data)
     this.grupoEscogido = this.grupos[indice];       
     this.clases = data;
    })
  }
  constructor(private _afs:FirestoreFirebaseService, private  _authService:AuthService){
    _authService.getProfile((err,profile)=>{
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
          })
     
    
        }
  
 
  
        setTimeout(() => {
          this.gruposCargados = true;
        }, 1000);
   
      })




    });
  }

}
