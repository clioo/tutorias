import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { Chart } from 'chart.js';
import { FirestoreFirebaseService } from '../../../services/firestore-firebase.service';
import { RealtimeFirebaseService } from '../../../services/realtime-firebase.service';
import { TusProyectosComponent } from '../tus-proyectos.component';
import { map } from 'rxjs/operators';
import { UsuarioPipe } from 'src/app/pipes/usuario.pipe';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  @ViewChild('canvas') canvas:ElementRef;
  chart:any = [] ;
  roles:any[] = [];
  tareas:any[] = [];
  rolesCargados:any;
  usuarios:any;
  constructor(private _fbService:RealtimeFirebaseService, private _afirestore:FirestoreFirebaseService, 
    @Inject(TusProyectosComponent) public app:TusProyectosComponent) {
      setTimeout(() => {
        _fbService.getUsuarios().subscribe(data=>{
          this.usuarios = data;
          this.rolesCargados = true;

        })
      }, 50);

      _afirestore.obtenerColeccionDeDocumento('proyectos', app.proyectoEscogido, 'roles').pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          data.id = a.payload.doc.id;
          return { data };
        })))
      .subscribe(data=>{
        let roles:any[] = [];
        this.roles = data;
        for (let i = 0; i < data.length; i++) {
          if (data[i].data.usuario != '') {
            roles.push(data[i].data)
          }
          this.roles = roles;
        }
        //aqui los roles ya están cargados
        setTimeout(() => {
          this.rolesCargados = true;
          
          for (let i = 0; i < this.roles.length; i++) {
            const element = this.roles[i];
            _afirestore.obtenerClasesDeGrupoo(app.proyectoEscogido).subscribe((data:any)=>{

              for (let i = 0; i < data.length; i++) {
                const element = data[i];
                this.tareas.push(element.data);
              }



            })

            
          }



        }, 200);
      })
   }

   aceptarEntregas(idTarea,idRol){
    this._afirestore.updateEstadoDeTarea(this.app.proyectoEscogido,idRol,idTarea,{
      estado:'a'
    })
   }

  ngOnInit() {
    let labels:any[] = [];
    let conteos:any[] = [];
    setTimeout(() => {
      // for (let i = 0; i < this.tareas.length; i++) {
      //   const element = this.tareas[i];
      //   labels.push(new UsuarioPipe().transform(element.usuario, this.usuarios))
      // }
      for (let i = 0; i < this.usuarios.length; i++) {
        const usuario = this.usuarios[i];
        let usuarioRegistrado = false;
        let contador = 0 ;
        for (let x = 0; x < this.tareas.length; x++) {
          const tarea = this.tareas[x];
          if (tarea.usuario == usuario.identity.user_id) {
            if (!usuarioRegistrado) {
              labels.push(new UsuarioPipe().transform(tarea.usuario, this.usuarios))
              usuarioRegistrado = true;
            }
            if (tarea.estado == 'a' || tarea.estado == 'b') {
              contador++;
            }
            
          }
        }
        //si el usuario tiene 0 entregas o en proceso
        if (contador > 0 || labels.length > conteos.length) {
          conteos.push(contador);

          
        }
        
        
      }
      let ctx = this.canvas.nativeElement.getContext('2d');
      this.chart =new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Productividad(entregados y aceptados)',
                data: conteos,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });    
    }, 2000);
  
  }

}
