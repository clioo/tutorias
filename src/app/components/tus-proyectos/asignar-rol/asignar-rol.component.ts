import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { TusProyectosComponent } from '../tus-proyectos.component';
import { map } from 'rxjs/operators';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FirestoreFirebaseService } from '../../../services/firestore-firebase.service';
import { RealtimeFirebaseService } from '../../../services/realtime-firebase.service';
import { Clase } from '../../../interface/clase.interface';

import * as $ from 'jquery';

export interface DialogData {
  idProyecto: string;
  idRol: string;
}
@Component({
  selector: 'app-asignar-rol',
  templateUrl: './asignar-rol.component.html',
  styleUrls: ['./asignar-rol.component.css']
})
export class AsignarRolComponent implements OnInit {
  animal: string;
  name: string;
  roles:any;
  usuarios:any;
  idUsuario:string;
  idAdmin:string;
  rolesCargados:boolean = false;
  fechaInicio:string;
  fechaFinal:string;
  materias:any[] = [];

  onNoClick(forma:any,start,end): void {
    //FALTA ASIGAR LA CALENDERIZACIÓN DE LA CLASE CON EL GRUPO
    if (forma.valid) {
      console.log(this.fechaFinal)
      let objeto:Clase = {
        title:forma.controls.titulo.value,
        idGrupo: this.app.proyectoEscogido,
        descripcion:forma.controls.descripcion.value,
        materia:this.materias[forma.controls.materia.value],
        estado:'c', //a = terminado, b=en curso, c= sin empezar
        entrega:'',
        start:start,
        end:end
      }
      console.log(objeto)
      this._afs.asignarClase(this.app.proyectoEscogido,objeto).then(()=>{
        alert('guardado')
      }).catch(err=>console.log(err));
    }

  }
  expulsarUsuario(idRol:any){
    this._afs.updateDocumentoEnColeccionDeProyecto(
      this.app.proyectoEscogido, 'roles', idRol,
      {
        usuario:''
      }
    ).then(data=>{
      // this.router.navigate(['/tus-proyectos'])
    }).catch(err=>console.log(err));
  }

  constructor(private _fbService:RealtimeFirebaseService, public dialog: MatDialog,private _afs:FirestoreFirebaseService, @Inject(TusProyectosComponent) public app:TusProyectosComponent) {
    _afs.obtenerMaterias().subscribe(data=>{
      this.materias = data;
    })
    

    _afs.obtenerColeccionDeDocumento('proyectos',app.proyectoEscogido,'roles').pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, data };
      }))).subscribe(data=>{
      this.idUsuario = app.profile.sub;
      this.idAdmin  = app.idUsuarioAdmin;
      this.roles = data;
      setTimeout(() => {
        _fbService.getUsuarios().subscribe(data=>{
          this.usuarios = data;
          this.rolesCargados = true;

        })
      }, 50);
      
      })

   }

   modalAgregarRol(idRol:any){
    const dialogRef = this.dialog.open(AgregarRolModal,{
      data:{
        idProyecto:this.app.proyectoEscogido
      }
    })
   }

  modalAsignarRol(idRol:any): void {
    const dialogRef = this.dialog.open(AsignarRolModal, {
      data: {idRol: idRol, idProyecto: this.app.proyectoEscogido}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.animal = result;
    });
  }
  ngOnInit() {
    }

}


@Component({
  selector: 'asignar-rol-modal',
  templateUrl: 'asignar-tarea-modal.html',
})
export class AsignarRolModal {

  constructor(
    public dialogRef: MatDialogRef<AsignarRolModal>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  chatear(){
    // let cadena:String="https://api.whatsapp.com/send?phone="+$('#numero').val()+"&text=";
    // let texto:String =  $('#cadena').val();
    // let result:String=texto.replace(" ","%20");
    // window.open(cadena=cadena+""+result);
  }


}


@Component({
  selector: 'agregar-rol-modal',
  templateUrl: 'agregar-rol-modal.html',
})
export class AgregarRolModal {

  constructor(
    public dialogRef: MatDialogRef<any>, private _afs:FirestoreFirebaseService,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(nombreRol:string): void {
    let arreglo:any[] = [];
    arreglo.push({
      nombre:nombreRol,
      usuario:''
    })




    if (nombreRol) {
      this._afs.agregarRolProyecto(arreglo , this.data.idProyecto);  
    }
    
  }

}

@Component({
  selector: 'nueva-clase-modal',
  templateUrl: 'nueva-clase-modal.html',
})
export class NuevaClaseaModal {
  @ViewChild('tarea') tarea:ElementRef;
  fechaInicio:string;
  fechaFinal:string;
  toDoList:any[] = [];
  constructor( public dialogRef: MatDialogRef<any>, private _afs:FirestoreFirebaseService,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

    onNoClick(forma:any,start,end): void {
      let tareasDeRol:any[] = [];
      // this._afs.obtenerTareasDeRol(this.data.idProyecto,this.data.idRol).subscribe(data=>{
      //   tareasDeRol = data;
      // })
      
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
      // this._afs.asignarTarea(this.data.idProyecto,this.data.idRol,objeto).then((data:any)=>{
        
      //   for (let i = 0; i < this.toDoList.length; i++) {
      //     const tarea = this.toDoList[i];
      //     this._afs.agregarToDoList(this.data.idProyecto,this.data.idRol,data.id,{
      //       tarea:tarea,
      //       completada:'f'
      //     }).then(()=>{
      //       console.log('al millon')
      //     }).catch(()=>{
      //       console.log('ayyy no')
      //     })
      //   }
      //   setTimeout(() => {
      //     if (tareasDeRol.length > 1) {
      //       alert('el usuario ya está haciendo una o más tareas, puede que afecte su desesmpeño');
      //     }
      //     this.dialogRef.close();  
      //   }, 1000);
      //   this._afs.agregarToDoList
      // }).catch(err=>console.log(err));
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
