import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usuario'
})
export class UsuarioPipe implements PipeTransform {



  transform(value: any, usuarios:any[]): any {
      console.log(usuarios);
        for (let i = 0; i < usuarios.length; i++) {
          if (usuarios[i].data.user_id == value) {
            return usuarios[i].data.name; 
          }
        }

  }

}
