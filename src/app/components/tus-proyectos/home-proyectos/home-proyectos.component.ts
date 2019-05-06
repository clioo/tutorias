import { Component, OnInit, Inject } from '@angular/core';
import { TusProyectosComponent } from '../tus-proyectos.component';

@Component({
  selector: 'app-home-proyectos',
  templateUrl: './home-proyectos.component.html',
  styleUrls: ['./home-proyectos.component.css']
})
export class HomeProyectosComponent implements OnInit {
  datosProyecto:any;
  constructor(@Inject(TusProyectosComponent) public app:TusProyectosComponent) {
    setTimeout(() => {
    }, 3000);
    
   }

  ngOnInit() {

  
  }

}
