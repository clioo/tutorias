import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './/app-routing.module';


//environment
import { environment } from '../environments/environment';

//components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { PreciosComponent } from './components/precios/precios.component';
import { ProtegidaComponent } from './components/protegida/protegida.component';
import {AppLoadingComponent} from './components/app-loading/app-loading.component';
import { CallbackComponent } from './components/callback/callback.component';
import { CrearProyectoComponent } from './components/crear-proyecto/crear-proyecto.component';
import { TusProyectosComponent } from './components/tus-proyectos/tus-proyectos.component';
import { UnirseProyectoComponent } from './components/unirse-proyecto/unirse-proyecto.component';
import { CuentaComponent } from './components/cuenta/cuenta.component';
import { ConfiguracionComponent } from './components/tus-proyectos/configuracion/configuracion.component';
import { AsignarRolComponent, AsignarRolModal, AgregarRolModal } from './components/tus-proyectos/asignar-rol/asignar-rol.component';
import { NuevaClaseaModal } from './components/tus-proyectos/asignar-rol/asignar-rol.component';

import { TuEquipoComponent, AsignarTareaModal, VerTareasModal } from './components/tus-proyectos/tu-equipo/tu-equipo.component';
import { TareasComponent, TareasModal } from './components/tus-proyectos/tareas/tareas.component';
import { InboxComponent } from './components/tus-proyectos/inbox/inbox.component';

//firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';

//services
import {ChatService} from './services/chat.service';
import { AuthService } from './services/auth.service';
import { AuthguardService } from './services/authguard.service';
import { RealtimeFirebaseService } from './services/realtime-firebase.service';
import { FirestoreFirebaseService } from './services/firestore-firebase.service';



//angular material
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatRadioModule, MatRadioGroup } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {
  MatNativeDateModule
} from '@angular/material';

//otros modulos
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


//full callendar
import { FullCalendarModule } from 'ng-fullcalendar';
import { HomeProyectosComponent } from './components/tus-proyectos/home-proyectos/home-proyectos.component';
import { UsuarioPipe } from './pipes/usuario.pipe';
import { UnirseProyectoLinkComponent } from './components/unirse-proyecto-link/unirse-proyecto-link.component';
import { UsuarioFotoPipe } from './pipes/usuario-foto.pipe';
import { EstadisticasComponent } from './components/tus-proyectos/estadisticas/estadisticas.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { AsesoresComponent, ModificarAsesorModal } from './components/asesores/asesores.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PreciosComponent,
    ProtegidaComponent,
    CallbackComponent,
    AppLoadingComponent,
    CrearProyectoComponent,
    TusProyectosComponent,
    UnirseProyectoComponent,
    CuentaComponent,
    ConfiguracionComponent,
    AsignarRolComponent,
    TuEquipoComponent,
    TareasComponent,
    InboxComponent,
    AsignarTareaModal,
    VerTareasModal,
    AsignarRolModal,
    TareasModal,
    AgregarRolModal,
    NuevaClaseaModal,
    ModificarAsesorModal,
    HomeProyectosComponent,
    UsuarioPipe,
    UnirseProyectoLinkComponent,
    UsuarioFotoPipe,
    EstadisticasComponent,
    UsuariosComponent,
    AsesoresComponent
  ],
  entryComponents:[AsignarTareaModal, 
    AgregarRolModal,
    NuevaClaseaModal,
    AsignarRolModal,
    TareasModal,
    VerTareasModal,
    ModificarAsesorModal
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    FullCalendarModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatDatepickerModule,
    MatProgressBarModule,
    MatNativeDateModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    AngularFireDatabaseModule
  ],
  providers: [
    AuthService,
    AuthguardService,
    ChatService,
    RealtimeFirebaseService,
    FirestoreFirebaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
