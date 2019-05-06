import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { RealtimeFirebaseService } from '../../services/realtime-firebase.service';
import { FirestoreFirebaseService } from '../../services/firestore-firebase.service';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';



@Component({
  selector: 'app-asesores',
  templateUrl: './asesores.component.html',
  styleUrls: ['./asesores.component.css']
})
export class AsesoresComponent implements OnInit {
  usuarios: Observable<any[]>;
  constructor(private af:RealtimeFirebaseService,private _afs:FirestoreFirebaseService, public dialog: MatDialog) {
    af.getUsuarios().subscribe((data:any)=>{
      this.usuarios = data;
      console.log(this.usuarios);
    });

   }

   openDialog(idUsuario:any): void {
    const dialogRef = this.dialog.open(ModificarAsesorModal, {
      width: '250px',
      data: {id: idUsuario}
    });

  }
  
  

  ngOnInit() {
  }

}

@Component({
  selector: 'modificar-asesor-modal',
  templateUrl: 'modificar-asesor-modal.html',
})
export class ModificarAsesorModal {
  identidad:any;
  @ViewChild('selectRol') selectRol:ElementRef;
  constructor(
    public dialogRef: MatDialogRef<ModificarAsesorModal>,
    @Inject(MAT_DIALOG_DATA) public data: any, private af:RealtimeFirebaseService) {
      af.getUsuario(data.id).subscribe((data:any)=>{
        console.log(data.identity);
        this.identidad = data.identity;
        this.selectRol.nativeElement.value = data.identity.rol;
      })
      

    }

    cambiarPropiedad(rol){
      this.af.updateUsuario(this.data.id,{
        rol:rol
      })
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
