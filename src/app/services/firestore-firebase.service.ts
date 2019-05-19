import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { map, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
}) 
export class FirestoreFirebaseService {
  private itemsCollection: AngularFirestoreCollection<any>;
  private angularFireStorageReference:AngularFireStorageReference;
  private angularFireUploadTask:AngularFireUploadTask;
  private prueba = new Array();
  
  constructor(private afs: AngularFirestore, private _afStorage:AngularFireStorage) { 
    // this.itemsCollection = afs.collection('grupos');
    // this.itemsCollection.snapshotChanges()
    // .pipe(
    //   map(actions => actions.map(a => {
    //     const data = a.payload.doc.data();
    //     const id = a.payload.doc.id;
    //     return { id, data };
    //   }))).subscribe(data=>{
    //     data.forEach(dato => {
    //       this.itemsCollection = afs.collection('grupos').doc(dato.id)
    //       .collection('roles', ref => ref.where('usuario', '==','facebook|2478787485496082' ));
    //       this.itemsCollection.valueChanges().subscribe(data=>{
    //         this.prueba.push({
    //           id:dato.id,
    //           titulo:dato.data.titulo
    //         })
    //       });
    //     });
    //     console.log(this.prueba)
    //   })
    }
    agregarToDoList(idProyecto,idRol,idTarea,objeto){
      this.itemsCollection = this.afs.collection('grupos').doc(idProyecto).collection('roles').doc(idRol)
      .collection('tarea').doc(idTarea).collection('toDoList');
      return this.itemsCollection.add(objeto);
    }
  //valuechanges obtiene los datos a la vista, bueno para mostrar en html
  obtenerDatosValueChanges(coleccion:string){
    return this.afs.collection<any>(coleccion).valueChanges();
  }
  obtenerMaterias(){
    return this.afs.collection('materias').valueChanges();
  }
  agregarDato(datos:any, coleccion:string){
    this.itemsCollection = this.afs.collection<any>(coleccion);
    datos.id = this.afs.createId();
    return this.itemsCollection.add(datos);
  }
  getById(id:string, coleccion:string){
    this.itemsCollection = this.afs.collection(coleccion);
    return this.itemsCollection.doc(id).valueChanges();
  }
  subirArchivo(event, idProyecto, idRol, idTarea){
    const file = event.target.files[0];
    const filePath = idProyecto + '-' + idRol + '-' + idTarea + '.zip';
    const fileRef = this._afStorage.ref(filePath);
    const task = this._afStorage.upload(filePath, file);
    let uploadPercent: Observable<number> =  task.percentageChanges();
    let objeto = {
      porcentaje:uploadPercent,
      linkDescarga:fileRef.getDownloadURL()
    };
    return objeto;

  
  }
  obtenerRolUsuario(idProyecto:string,usuario:string){
    let rol:any;
    this.itemsCollection = this.afs.collection('grupos').doc(idProyecto).collection('integrantes', ref => ref.where('usuario', '==',usuario))
    return this.itemsCollection.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data };
        })))
  }
  obtenerClasesDeGrupoo(idGrupo:string){
    this.itemsCollection = this.afs.collection('grupos').doc(idGrupo).collection('clases');
    return this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        data.id = a.payload.doc.id;
        return { data };
      })))

  }
  obtenerToDoList(idProyecto,idRol,idTarea){
    this.itemsCollection = this.afs.collection('grupos').doc(idProyecto).collection('integrantes')
    .doc(idRol).collection('tarea').doc(idTarea).collection('toDoList');
    return this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        data.id = a.payload.doc.id;
        return { data };
      })))
  }
  obtenerTareaSingular(idGrupo,idTarea){
    this.itemsCollection = this.afs.collection('grupos').doc(idGrupo).collection('clases');
    return this.itemsCollection.doc(idTarea).valueChanges();
  }
  agregarRolProyecto(datos:any[],idProyecto:string){
    this.itemsCollection = this.afs.collection('grupos').doc(idProyecto).collection('integrantes');

    datos.forEach(dato => {
      this.itemsCollection.add(dato).then(()=>{
        console.log('si jala');
      });
    });

    // datos.forEach(dato => {
    //   dato.id = this.afs.createId();
    //   this.itemsCollection.doc(idProyecto).collection('roles').add(dato).then(()=>{
    //     console.log('si jala')
    //   }).catch((err)=>console.log(err))
    // });
  }
  agregarMaterias(nombreMateria:any,idGrupo:any){
    this.itemsCollection = this.afs.collection('grupos').doc(idGrupo).collection('materiasDominadas');
    return this.itemsCollection.add({
      nombre:nombreMateria
    });
  }
  agregarIntegrante(objeto,idGrupo){
    this.itemsCollection = this.afs.collection('grupos').doc(idGrupo).collection('integrantes');
    return this.itemsCollection.add(objeto);
  }
  obtenerColeccionDeDocumento(nombreColeccion:string,idDocumento:string, nombreColeccionDocumento){
    this.itemsCollection = this.afs.collection<any>(nombreColeccion).doc(idDocumento).collection(nombreColeccionDocumento);
    return this.itemsCollection.snapshotChanges();
  }
  updateDocumentoEnColeccionDeProyecto(idDocumento:string,nombreColeccionDocumento:string,idDocumentoEnColeccion:string,data:any){
    this.itemsCollection = this.afs.collection<any>('grupos').doc(idDocumento).collection(nombreColeccionDocumento);

    return this.itemsCollection.doc(idDocumentoEnColeccion).update(data);

  }
  updateEstadoDeTarea(idProyecto,idRol,idTarea,data:any){
    this.itemsCollection = this.afs.collection<any>('grupos').doc(idProyecto).collection('integrantes').doc(idRol).collection('tarea');
    return this.itemsCollection.doc(idTarea).update(data);
  }

  updateEstadoToDoList(idProyecto,idRol,idTarea,idToDoList,objeto){
    this.itemsCollection = this.afs.collection('grupos').doc(idProyecto).collection('integrantes')
    .doc(idRol).collection('tarea').doc(idTarea).collection('toDoList');
    return this.itemsCollection.doc(idToDoList).update(objeto);
  }

  

  asignarClase(idGrupo:string,data:any){
    this.itemsCollection = this.afs.collection('grupos').doc(idGrupo).collection('clases');
    return this.itemsCollection.add(data);
  }
 

 

}
