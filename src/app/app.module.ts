import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
//  import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';

// import { AccordionModule } from 'ngx-bootstrap';
// agrego las clases para utilizar ruteo
import { RouterModule, Routes } from '@angular/router';

import { MiHttpService } from './servicios/mi-http/mi-http.service'; 

import { ErrorComponent } from './componentes/error/error.component';

import { RuteandoModule } from './ruteando/ruteando.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {AuthService} from '../app/servicios/auth.service'; 
import { RecaptchaModule } from 'ng-recaptcha';
import {AngularFireStorageModule} from '@angular/fire/storage'

import {environment} from '../environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatCardModule } from '@angular/material';
// declaro donde quiero que se dirija
/*
const MiRuteo = [{path: 'error' , component: ErrorComponent},
{path: 'Login' , component: LoginComponent},
{path: 'Principal' , component: PrincipalComponent , pathMatch: 'full'},
{path: 'Adivina' , component: AdivinaElNumeroComponent},
{path: 'AdivinaMasListado' , component: AdivinaMasListadoComponent},
{path: 'AgilidadaMasListado' , component: AgilidadMasListadoComponent},
{path: 'Agilidad' , component: AgilidadAritmeticaComponent},
{path: '' , component: LoginComponent , pathMatch: 'full'},

{path: '**' , component: ErrorComponent} ];
*/
import { RegistroComponent } from './componentes/registro/registro.component';
import { CabeceraComponent } from './componentes/cabecera/cabecera.component';
import { QuienSoyComponent } from './componentes/quien-soy/quien-soy.component';
import { AgmCoreModule } from '@agm/core';
import { SexoPipe } from './pipes/sexo.pipe';
import { HomeComponent } from './componentes/home/home.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { AdminPageComponent } from './componentes/admin-page/admin-page.component';
import { ClientePageComponent } from './componentes/cliente-page/cliente-page.component';
import { RecepcionPageComponent } from './componentes/recepcion-page/recepcion-page.component';
import { EspecialistaPageComponent } from './componentes/especialista-page/especialista-page.component';
import { AltaAdminComponent } from './componentes/alta-admin/alta-admin.component';
import { TurnosClienteComponent } from './componentes/turnos-cliente/turnos-cliente.component';
import { ListaTurnosClienteComponent } from './componentes/lista-turnos-cliente/lista-turnos-cliente.component';
import { TurnosRecepcionComponent } from './componentes/turnos-recepcion/turnos-recepcion.component';
import { AltaTurnoRecepcionComponent } from './componentes/alta-turno-recepcion/alta-turno-recepcion.component';
import { TurnosEspecialistaComponent } from './componentes/turnos-especialista/turnos-especialista.component';
import { EstadisticasComponent } from './componentes/estadisticas/estadisticas.component';
import { Aux1Component } from './componentes/aux1/aux1.component';
import { RegistrosComponent } from './componentes/registros/registros.component';
import { CancelarTurnoComponent } from './componentes/cancelar-turno/cancelar-turno.component';
import { TurnosAdminComponent } from './componentes/turnos-admin/turnos-admin.component';
import { EncuestasAdminComponent } from './componentes/encuestas-admin/encuestas-admin.component';
import { ActivadorService } from './servicios/activador.service';
import { EncuestasClienteComponent } from './componentes/encuestas-cliente/encuestas-cliente.component';


@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    LoginComponent,
    RegistroComponent,
    CabeceraComponent,
    QuienSoyComponent,
    SexoPipe,
    HomeComponent,
    FooterComponent,
    AdminPageComponent,
    ClientePageComponent,
    RecepcionPageComponent,
    EspecialistaPageComponent,
    AltaAdminComponent,
    TurnosClienteComponent,
    ListaTurnosClienteComponent,
    TurnosRecepcionComponent,
    AltaTurnoRecepcionComponent,
    TurnosEspecialistaComponent,
    EstadisticasComponent,
    Aux1Component,
    RegistrosComponent,
    CancelarTurnoComponent,
    TurnosAdminComponent,
    EncuestasAdminComponent,
    EncuestasClienteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RuteandoModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB6f8x4IjRlesQ3oETc6BXYQHVRTOlY3Ys'
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    RecaptchaModule,
    MatCardModule,
    RecaptchaModule.forRoot()
    // NgbModule.forRoot(MiRuteo),
    // importo el ruteo
    // RouterModule.forRoot(MiRuteo)
  ],
  providers: [ AngularFirestore, MiHttpService,AuthService, ActivadorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
