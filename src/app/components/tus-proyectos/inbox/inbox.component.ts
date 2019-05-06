import { Component, OnInit, ElementRef, ViewChild, Inject, Input } from '@angular/core';
import { ChatService } from '../../../services/chat.service';
import { AuthService } from '../../../services/auth.service';
import { ProtegidaComponent } from '../../protegida/protegida.component';
import { TusProyectosComponent } from '../tus-proyectos.component';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {
  @ViewChild('appMensajes') elemento:ElementRef;
  mensaje = "";
  usuario:any;
  enviarMensaje(){
      if(this.mensaje == ""){
        return; 
      }else{
        this._chatservice.agregarMensaje
        (this.mensaje, this.app.proyectoEscogido, this.usuario.name, this.usuario.sub).then(()=>{
          this.mensaje ="";
        })
        .catch(err=>{
          alert(err);
        })
      }

  }  
  constructor(@Inject(TusProyectosComponent) public app:TusProyectosComponent,public _chatservice:ChatService, public _authService:AuthService) {
    if (this.app.proyectoEscogido != '0') {
      this._chatservice.cargarMensajes(this.app.proyectoEscogido).subscribe((mensajes:any[])=>{{        this._chatservice.chats = [];
        for(let mensaje of mensajes){
          this._chatservice.chats.unshift(mensaje);
        }
        setTimeout(() => {
          this.elemento.nativeElement.scrollTop = this.elemento.nativeElement.scrollHeight;
        }, 20);
      }});
  
    }
    
   }

  ngOnInit() {
    if (this._authService.userProfile) {
      this.usuario = this._authService.userProfile;
    } else {
      this._authService.getProfile((err, profile) => {
        this.usuario = profile;      });
    }
  }


}
