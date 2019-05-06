import { Component, OnInit, ViewChild, Inject, ElementRef  } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options} from 'fullcalendar';
import { FirestoreFirebaseService } from '../../../services/firestore-firebase.service';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { TusProyectosComponent } from '../tus-proyectos.component';
import * as $ from 'jquery';
export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {
  roles:any[] = [];
  tareas = new Array();
  animal: string;
  name: string;
  constructor(public dialog: MatDialog, @Inject(TusProyectosComponent) public app:TusProyectosComponent,
    _afs:FirestoreFirebaseService) {
    _afs.obtenerRolUsuario(app.proyectoEscogido,app.profile.sub).subscribe(roles=>{
      console.log('entra')
      this.roles = roles;
      for (let i = 0; i < roles.length; i++) {
        const element = roles[i];
        _afs.obtenerTareasDeRol(app.proyectoEscogido, element.id).subscribe(data=>{
          let tareas:any[] = [];
          for (let i = 0; i < data.length; i++) {
            const element = data[i];
            tareas.push(element.data);
          }
          this.tareas = tareas;
          $('#calendar').fullCalendar({
            events: this.tareas,
            defaultView:"month",
             editable: true,
             eventLimit: false,
             header: {
               left: 'prev,next today',
               center: 'title', 
               right: 'month,agendaWeek,agendaDay,listMonth'
             },
            eventClick: function(calEvent, jsEvent, view) {
    
              const dialogRef = dialog.open(TareasModal, {
                data: {
                  data:calEvent,
                  idProyecto:app.proyectoEscogido,
                  idRol:roles[0].id
                }
              });
          
              dialogRef.afterClosed().subscribe(result => {
                console.log('The dialog was closed');
              });
          
          
            }
          });
        })  
      }
      
    });
   }
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  calendarOptions: Options;
  ngOnInit() {

   

  
 
  }

 




  //abrir modal
  openDialog(): void {

  }

}







@Component({
  selector: 'tareas-modal',
  templateUrl: 'tareas-modal.html',
})
export class TareasModal {
  @ViewChild('selectEstado') selectEstado:ElementRef;
  estado;
  procentajeSubida;
  toDoList:any[] = [];
  constructor(public dialogRef: MatDialogRef<TareasModal>, @Inject(MAT_DIALOG_DATA) public data:any, public _afs:FirestoreFirebaseService) 
    {
      _afs.obtenerTareaSingular(data.idProyecto,data.idRol,data.data.id).subscribe((data:any)=>{
        this.estado = data.estado;
      });
      this.estado = data.data.estado;
      _afs.obtenerToDoList(data.idProyecto,data.idRol,data.data.id).subscribe(data=>{
        this.toDoList = data;
        //console.log(this.toDoList);
      })
    }

    cambarToDoList(id, estado){
      this._afs.updateEstadoToDoList(this.data.idProyecto,this.data.idRol,this.data.data.id,id,{
        completada:estado
      }).then(()=>{
        console.log('uasudsaudsaudsau')
      }).catch(err=>{
        console.log(err);
      })
    }


    subirArchivo(event){
      let respuesta = this._afs.subirArchivo(event, this.data.idProyecto, this.data.idRol, this.data.data.id);
      respuesta.porcentaje.subscribe((data:any)=>{
        this.procentajeSubida = data;
        if (data == '100') {
         respuesta.linkDescarga.subscribe(data=>{
           this._afs.updateEstadoDeTarea(this.data.idProyecto,this.data.idRol,this.data.data.id,{
             entrega:data,
             estado:'b'
           });
           this.estado = 'b';
           this.dialogRef.close();
         })
        }
      })
    }
    cambioStatus(){
      this._afs.updateEstadoDeTarea(this.data.idProyecto,this.data.idRol,this.data.data.id,{
        estado:this.selectEstado.nativeElement.value
      }).then(()=>{
        this.estado = this.selectEstado.nativeElement.value;
        this.dialogRef.close();
      }).catch(err=>console.log(err))
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
