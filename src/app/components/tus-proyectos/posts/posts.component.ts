import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { AsignarRolModal, DialogData } from '../asignar-rol/asignar-rol.component';
import { TusProyectosComponent } from '../tus-proyectos.component';
import { FirestoreFirebaseService } from '../../../services/firestore-firebase.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  profile:any;
  constructor(@Inject(TusProyectosComponent) public app:TusProyectosComponent, public dialog: MatDialog,
  _authService:AuthService,private _afs:FirestoreFirebaseService) { 
    _authService.getProfile((err,profile)=>{
      this.profile = profile;
      console.log(profile);
    });
  }

  ngOnInit() {
  }

  newPost(){
    const dialogRef = this.dialog.open(NuevoPostModal,{
      data:{
        idProyecto:this.app.proyectoEscogido,
        idUsuario: this.profile.sub
      }
    })
  }

}


@Component({
  selector: 'nuevo-post-modal',
  templateUrl: 'nuevoAporteModal.html',
})
export class NuevoPostModal {
  estado;
  procentajeSubida;
  contenido;
  constructor(
    public dialogRef: MatDialogRef<AsignarRolModal>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private _afs:FirestoreFirebaseService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  subirArchivo(event){
      let respuesta = this._afs.subirArchivo(event, this.data.idProyecto, this.data.idUsuario);
      respuesta.porcentaje.subscribe((data:any)=>{
        this.procentajeSubida = data;
        if (data == '100') {
        respuesta.linkDescarga.subscribe(link=>{
          data = {
            link:link,
            contenido:this.contenido,
            usuario:this.data.idUsuario
          }
          this._afs.agregarPost(this.data.idProyecto,data).then((data)=>{
            this.dialogRef.close();
          })
          // this._afs.updateEstadoDeTarea(this.data.idProyecto,this.data.idRol,this.data.data.id,{
          //   entrega:data,
          //   estado:'b'
          // });
          // this.estado = 'b';
          
        })
        }
      })
    }
    cambioStatus(){
      // this._afs.updateEstadoDeTarea(this.data.idProyecto,this.data.idRol,this.data.data.id,{
      //   estado:this.selectEstado.nativeElement.value
      // }).then(()=>{
      //   this.estado = this.selectEstado.nativeElement.value;
      //   this.dialogRef.close();
      // }).catch(err=>console.log(err))
    }

}
