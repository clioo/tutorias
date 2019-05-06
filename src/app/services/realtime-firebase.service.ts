import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class RealtimeFirebaseService {
  private usuarios: Observable<any[]>;
  constructor(private af:AngularFireDatabase) {   }
   getUsuarios(){
    return this.af.list('users').snapshotChanges().pipe(
      map(actions => actions.map((a:any) => {
        const data = a.payload.val().identity;
        const id = a.key;
        return { id, data };
      })))
    // return this.af.list('users').valueChanges();
   }
   getUsuario(id:any){
     return this.af.object('users/'+id).valueChanges();
   }
   updateUsuario(id,objeto){
    return this.af.object('users/'+id+'/identity').update(objeto);
   }

  }
