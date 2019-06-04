import { Component, OnInit } from '@angular/core';
import { FirestoreFirebaseService } from '../../services/firestore-firebase.service';
import { Grupos } from '../../interface/grupos.interface';
import { AuthService } from '../../services/auth.service';
import { RealtimeFirebaseService } from 'src/app/services/realtime-firebase.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


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
  //aquí entra código de otro componente
  roles:any[] = [];
  usuarios: Observable<any[]>;
  rolUsuario:any;
  rolesCargados:boolean = false;
  yaEscogio:Boolean = false;
  ngOnInit() {
  }
  public cambiarEscogido(indice:any){
    this._afs.obtenerClasesDeGrupoo(this.grupos[indice].id).subscribe((data:any)=>{
      console.log(data)
     this.grupoEscogido = this.grupos[indice];       
     this.clases = data;
     this.yaEscogio = true;
    })

    this._afs.obtenerColeccionDeDocumento('grupos', this.grupoEscogido, 'integrantes').pipe(
        map(actions => actions.map(a => 
        {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data };
        }))).subscribe(data=>{
        let roles:any[] = [];
        this.roles = data;
        for (let i = 0; i < data.length; i++) {
          if (data[i].data.usuario != '') {
            roles.push(data[i])
          }
          this.roles = roles;
        }
        setTimeout(() => {
          this.rolesCargados = true;
        }, 200);
    })
  }
  constructor(private _afs:FirestoreFirebaseService, private  _authService:AuthService,
    private af:RealtimeFirebaseService){
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

      af.getUsuarios().subscribe((data:any)=>{
        this.usuarios = data;
      });
    });
  }

}
