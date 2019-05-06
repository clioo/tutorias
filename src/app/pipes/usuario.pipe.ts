import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usuario'
})
export class UsuarioPipe implements PipeTransform {



  transform(value: any, usuarios:any[]): any {
    if (value) {
        for (let i = 0; i < usuarios.length; i++) {
          if (usuarios[i].identity.user_id == value) {
            console.log(usuarios[i].data.name);
            return usuarios[i].data.name; 
          }
        }

       }else{
      return 'Sin asignar';
    }
    
  }

}
