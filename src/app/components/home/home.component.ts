import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
//providers
import { AuthService } from '../../services/auth.service';
import { FirestoreFirebaseService } from '../../services/firestore-firebase.service';

 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  profile:any;
  proyectos:any[] = [];
  private itemsCollection: AngularFirestoreCollection<any>;

  public users:any[]=[];
  constructor(private _authService:AuthService, private _afs:FirestoreFirebaseService, private afs: AngularFirestore) {
    // afs.agregarDato({
    //   nombre:'chiho',
    //   apellido:'prueba2'
    // },'prueba1').then(()=>{
    //   console.log("todo al 100");
    // }).catch(err=>{
    //   console.log(err);
    // })
    // afs.obtenerDatos('prueba1').subscribe((data:any)=>{
    //   data.forEach(dato => {
    //     console.log(dato);
    //   });
    // })

  }
  iniciar(){
    if (this._authService.isAuthenticated()) {
      
    }else{  
      this._authService.login();
    }
  }
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
    this.itemsCollection = this.afs.collection<any>('proyectos');
    this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        data.id = a.payload.doc.id;
        return data ;
      }))).subscribe((data:any)=>{
        for (let i = 0; i < data.length; i++) {
          this.itemsCollection = this.afs.collection('proyectos').doc(data[i].id)
          .collection('roles', ref => ref.where('usuario', '==',this.profile.sub ));
          this.itemsCollection.snapshotChanges().pipe(
            map(actions => actions.map(a => {
              const data = a.payload.doc.data();
              data.id = a.payload.doc.id;
              return data ;
            }))).subscribe(data2=>{
              if (data2.length > 0) {
                this.proyectos.push(data[i]);
              }

            })
        }
        console.log(this.proyectos)
      })
  }
}
