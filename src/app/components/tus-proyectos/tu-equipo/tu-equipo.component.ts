import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { RealtimeFirebaseService } from '../../../services/realtime-firebase.service';
import { FirestoreFirebaseService } from '../../../services/firestore-firebase.service';
import { TusProyectosComponent } from '../tus-proyectos.component';
import { map } from 'rxjs/operators';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { fromTask } from '@angular/fire/storage';
@Component({
  selector: 'app-tu-equipo',
  templateUrl: './tu-equipo.component.html',
  styleUrls: ['./tu-equipo.component.css']
})
export class TuEquipoComponent implements OnInit {
  roles:any[] = [];
  usuarios: Observable<any[]>;
  rolUsuario:any;
  rolesCargados:boolean = false;
  constructor(public dialog: MatDialog,private af:RealtimeFirebaseService, _afs:FirestoreFirebaseService, @Inject(TusProyectosComponent) public app:TusProyectosComponent) { 
    af.getUsuarios().subscribe((data:any)=>{
      this.usuarios = data;
    });
    _afs.obtenerRolUsuario(app.proyectoEscogido, app.profile.sub)
    .subscribe(data=>{
      this.rolUsuario = data;
    })

    _afs.obtenerColeccionDeDocumento('grupos', app.proyectoEscogido, 'integrantes').pipe(
      map(actions => actions.map(a => {
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
    modalAsignarTarea(idRol:any,usuario:any){
      const dialogRef = this.dialog.open(AsignarTareaModal,{
        data:{
          idProyecto:this.app.proyectoEscogido,
          idRol:idRol,
          idUsuarioRol:usuario
        }
      })
     }
     modalVerTareas(idUsuario, idRol){
      const dialogRef= this.dialog.open(VerTareasModal,{
        data:{
          idProyecto:this.app.proyectoEscogido,
          idUsuario:idUsuario,
          idUsuarioLoggeado:this.app.profile.sub,
          idUsuarioAdmin:this.app.idUsuarioAdmin,
          idRol:idRol,
          usuarios:this.usuarios
        }
        
      })
     }
  ngOnInit() {
  }

}

@Component({
  selector: 'asignar-tarea-modal',
  templateUrl: 'asignar-tarea-modal.html',
})
export class AsignarTareaModal {
  @ViewChild('tarea') tarea:ElementRef;
  fechaInicio:string;
  fechaFinal:string;
  toDoList:any[] = [];
  constructor(
    public dialogRef: MatDialogRef<any>, private _afs:FirestoreFirebaseService,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

    onNoClick(forma:any,start,end): void {
      let tareasDeRol:any[] = [];
      this._afs.obtenerTareasDeRol(this.data.idProyecto,this.data.idRol).subscribe(data=>{
        tareasDeRol = data;
      })
      
    if (forma.valid) {
      


      let objeto:any = {
        title:forma.controls.titulo.value,
        idRol: this.data.idRol,
        descripcion:forma.controls.descripcion.value,
        estado:'c', //a = terminado, b=en curso, c= sin empezar
        entrega:'',
        start:start,
        end:end,
        usuario: this.data.idUsuarioRol
      }
      this._afs.asignarTarea(this.data.idProyecto,this.data.idRol,objeto).then((data:any)=>{
        
        for (let i = 0; i < this.toDoList.length; i++) {
          const tarea = this.toDoList[i];
          this._afs.agregarToDoList(this.data.idProyecto,this.data.idRol,data.id,{
            tarea:tarea,
            completada:'f'
          }).then(()=>{
            console.log('al millon')
          }).catch(()=>{
            console.log('ayyy no')
          })
        }
        setTimeout(() => {
          if (tareasDeRol.length > 1) {
            alert('el usuario ya está haciendo una o más tareas, puede que afecte su desesmpeño');
          }
          this.dialogRef.close();  
        }, 1000);
        this._afs.agregarToDoList
      }).catch(err=>console.log(err));
    }

  }
  agrearTarea(tarea:any){
    this.toDoList.push(tarea);
    this.tarea.nativeElement.value = ''; 
  }
  eliminarTarea(i){
    this.toDoList.splice(i,1);
  }

}


@Component({
  selector: 'ver-tareas-modal',
  templateUrl: 'ver-tareas-modal.html',
})
export class VerTareasModal {
  tareas:any;
  constructor(public dialogRef: MatDialogRef<any>, private _afs:FirestoreFirebaseService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      _afs.obtenerTareasDeRol(data.idProyecto,data.idRol).subscribe(data=>{
        this.tareas = data;
      })
    }
    aceptarEntregas(idTarea){
      this._afs.updateEstadoDeTarea(this.data.idProyecto,this.data.idRol,idTarea,{
        estado:'a'
      })
    }
    onNoClick(forma:any,start,end): void {
 

  }

}
