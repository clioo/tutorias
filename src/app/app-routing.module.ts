import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

//componentes
import { HomeComponent } from './components/home/home.component';
import { PreciosComponent } from './components/precios/precios.component';
import { ProtegidaComponent } from './components/protegida/protegida.component';
import { UnirseProyectoComponent } from './components/unirse-proyecto/unirse-proyecto.component';
import { TusProyectosComponent } from './components/tus-proyectos/tus-proyectos.component';
import { CrearProyectoComponent } from './components/crear-proyecto/crear-proyecto.component';
import { CuentaComponent } from './components/cuenta/cuenta.component';
import { CallbackComponent } from './components/callback/callback.component';
import { UnirseProyectoLinkComponent } from './components/unirse-proyecto-link/unirse-proyecto-link.component';
import { AsesoresComponent } from './components/asesores/asesores.component';
import { ListaComponent } from './components/lista/lista.component';




import { AuthguardService } from './services/authguard.service';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'precios', component: PreciosComponent },
  { path: 'unirse', component: UnirseProyectoComponent, canActivate:[AuthguardService] },
  { path: 'unirse/:idProyecto/:idRol', component: UnirseProyectoLinkComponent, canActivate:[AuthguardService] },
  { path: 'tus-proyectos', component: TusProyectosComponent, canActivate:[AuthguardService] },
  { path: 'tus-proyectos/:idProyecto', component: TusProyectosComponent, canActivate:[AuthguardService] },
  { path: 'crear-grupo', component: CrearProyectoComponent, canActivate:[AuthguardService] },
  { path: 'asesores', component: AsesoresComponent, canActivate:[AuthguardService] },
  { path: 'cuenta', component: CuentaComponent, canActivate:[AuthguardService] },
  { path: 'callback', component: CallbackComponent},
  { path: 'protegida', component: ProtegidaComponent, canActivate:[AuthguardService] },
  { path: 'lista', component: ListaComponent, canActivate:[AuthguardService] },
  { path: '**', component: HomeComponent },

  //{ path: 'path/:routeParam', component: MyComponent },
  //{ path: 'staticPath', component: ... },
  //{ path: '**', component: ... },
  //{ path: 'oldPath', redirectTo: '/staticPath' },
  //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
