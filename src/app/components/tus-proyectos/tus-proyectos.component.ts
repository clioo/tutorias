import { Component, OnInit, AfterContentChecked, Input, Inject, ViewChild, ElementRef } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

import {FormControl} from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from '../../services/auth.service';
import { FirestoreFirebaseService } from '../../services/firestore-firebase.service';

import { map } from 'rxjs/operators';




@Component({
  selector: 'app-tus-proyectos',
  templateUrl: './tus-proyectos.component.html',
  styleUrls: ['./tus-proyectos.component.css']
})
export class TusProyectosComponent implements OnInit {
  @ViewChild('selectProyectos') selectProyectos:ElementRef;
  profile:any;
  //*************PROYECTOS****************************** 
  @Input() proyectoEscogido:string = '0';
  @Input() datosProyectoEscogido:any;
  proyectosCargados = true;
  proyectosUsuario:any;
  @Input() proyectos = new Array();
  @Input() idUsuarioAdmin:string;
  cambiarTipo(value:any){
    this.router.navigateByUrl('/tus-proyectos', {skipLocationChange: false}).then(()=>
      this.router.navigate(['/tus-proyectos', value])); 
  }
  //****************************************************



  private itemsCollection:AngularFirestoreCollection;
  constructor(private activatedRoute:ActivatedRoute, private router:Router ,private afs:AngularFirestore,private _authService:AuthService, private _fsService:FirestoreFirebaseService) { 
  

    
  }
  opened = true;
  tab = 0; //1=inbox 2=tarea 3=tuequipo 4=asignartarea 5=configuraciones
  ngOnInit() {
    if (this._authService.userProfile) {
      this.profile = this._authService.userProfile;
      this.cargarProyectos();
      } else {
      this._authService.getProfile((err, profile) => {
        this.profile = profile;
        this.cargarProyectos();
      });


    }
    



  

    
}

cargarProyectos(){
  this.afs.collection('grupos')
      .snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data };
        })))
        .subscribe(data => {
  
          //********PROYECTOS */
          //, ref => ref.where('usuario', '==',this.profile.sub )
          data.forEach((dato:any) => {
            this.itemsCollection = this.afs.collection('grupos').doc(dato.id)
            .collection('integrantes', ref => ref.where('usuario', '==',this.profile.sub ));
            this.itemsCollection.valueChanges().subscribe((data:any)=>{
              data.forEach(dato2 => {
                if (dato.id == this.proyectoEscogido) {
                  this.datosProyectoEscogido = {
                    id:dato.id,
                    titulo:dato.data.titulo,
                    descripcion:dato.data.descripcion
                  }
                }
                this.proyectos.push({
                  id:dato.id,
                  titulo:dato.data.nombre,
                  descripcion:dato.data.descripcion
                })              });

            });
          });




          //********PROYECTOS */
          this.proyectosCargados = false;
          setTimeout(() => {
            this.activatedRoute.params.subscribe(params=>{
              if (typeof params['idProyecto'] === 'undefined') {
                this.proyectoEscogido = '0';
                this.selectProyectos.nativeElement.value = '0';
              }else{
                this.proyectoEscogido = String(params['idProyecto']);

                setTimeout(() => {
                  this.selectProyectos.nativeElement.value = this.proyectoEscogido;
                }, 500);
                
                this._fsService.obtenerColeccionDeDocumento('grupos',this.proyectoEscogido,'integrantes').pipe(
                  map(actions => actions.map(a => {
                    const data = a.payload.doc.data();
                    const id = a.payload.doc.id;
                    return { id, data };
                  })))
                .subscribe((data:any)=>{
                  data.forEach(dato => {
                    if (dato.data.nombre == 'Administrador') {
                      this.idUsuarioAdmin = String(dato.data.usuario); 
                    }
                  });
                })  

              }
            })
          }, 50);
        });
}



  mode = new FormControl('push');
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
}
