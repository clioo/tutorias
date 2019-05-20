import { Component } from '@angular/core';
import { Grupos } from '../../interface/grupos.interface';

import { FirestoreFirebaseService } from '../../services/firestore-firebase.service';

 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public grupos:Grupos[] = [];
  gruposCargados:boolean = false;
  constructor(public _afs:FirestoreFirebaseService) {
    _afs.obtenerGrupos().subscribe((data:any)=>{
      this.grupos = data;
      //abrimos for para obtener las materias dominadas por cada grupo
      for (let i = 0; i < this.grupos.length; i++) {
        _afs.obtenerMateriasDominadasDeGrupo(this.grupos[i].id).subscribe((data:any)=>{
          //materiasDominadas no estaba inicializada pero existe en la interfaz, aquí inicializamos
          // su valor
          this.grupos[i].materiasDominadas = data;
        })
      }
      console.log(this.grupos);


      this.gruposCargados = true;
    })
  }

}
