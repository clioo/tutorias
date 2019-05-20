import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirestoreFirebaseService } from '../../services/firestore-firebase.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-proyecto',
  templateUrl: './crear-proyecto.component.html',
  styleUrls: ['./crear-proyecto.component.css']
})
export class CrearProyectoComponent implements OnInit {
  form:any;
  guardado:boolean = false;
  nombre:any;
  profile:any;
  rol:string = '';
  roles:any[] = [];
  materias:any[] = [];
  materiasDominadas:any[] = [];
  constructor(private afs:FirestoreFirebaseService, private _authService:AuthService, private router:Router) {
    this.form = new  FormGroup({
      'nombre': new FormControl('', Validators.required),
    });
    afs.obtenerMaterias().subscribe(data=>{
      this.materias = data;
    })
   }
  
   materiaAgregada(index){
     if (this.materiasDominadas.includes(index)) {
       
       console.log('quita');
       this.materiasDominadas.splice(this.materiasDominadas.indexOf(index), 1);
     }else {
      this.materiasDominadas.push(index);
      console.log('mete');
     }
   }


  agregarRol(rol:string){
    let objeto = {
      nombre: rol,
      usuario: ''
    }
    this.roles.push(objeto);
    this.rol = '';
  }
  eliminarRol(idRol:number){
    this.roles.splice(idRol,1);
  }
  guardar(){
    var objeto:any = this.form.value;
    objeto.usuario = this.profile.sub;
    objeto.fecha= new Date().getTime();
    console.log(this.form);
    if (this.form.valid) {
      console.log('si entraste')
      //variable para el app-loading 
      this.guardado = true;
      
      //crea los proyectos y agrega los roles
      this.afs.agregarDato(objeto,'grupos').then((data)=>{
        console.log(data.id)
        let objeto = {
          rol:'Administrador',
          usuario:this.profile.sub
        }
        this.afs.agregarIntegrante(objeto,data.id);
        for (let i = 0; i < this.materiasDominadas.length; i++) {
          let materia = this.materiasDominadas[i];
          console.log(this.materias[materia])
          this.afs.agregarMaterias(this.materias[materia], data.id)
          
        }
        this.router.navigate(['tus-proyectos']);
        // this.afs.obtenerDatos('proyectos').subscribe(data=>{
        //   // console.log(data[data.length - 1]);
        // })
      });  
    }
    
    
  }
  ngOnInit() {
    if (this._authService.userProfile) {
      this.profile = this._authService.userProfile;
    } else {
      this._authService.getProfile((err, profile) => {
        this.profile = profile;
      });
    }
  }

}
