import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../componentes/login/login.component';
import { ErrorComponent } from '../componentes/error/error.component';
import { RegistroComponent } from '../componentes/registro/registro.component';
import { QuienSoyComponent } from '../componentes/quien-soy/quien-soy.component'
import { AdminPageComponent } from '../componentes/admin-page/admin-page.component';
import { ClientePageComponent } from '../componentes/cliente-page/cliente-page.component';
import { EspecialistaPageComponent } from '../componentes/especialista-page/especialista-page.component';
import { RecepcionPageComponent } from '../componentes/recepcion-page/recepcion-page.component';
import {AltaAdminComponent} from './../componentes/alta-admin/alta-admin.component';
import {TurnosClienteComponent} from './../componentes/turnos-cliente/turnos-cliente.component';
import { ListaTurnosClienteComponent } from './../componentes/lista-turnos-cliente/lista-turnos-cliente.component'
import {TurnosRecepcionComponent} from './../componentes/turnos-recepcion/turnos-recepcion.component'
import {AltaTurnoRecepcionComponent} from './../componentes/alta-turno-recepcion/alta-turno-recepcion.component';
import { TurnosEspecialistaComponent } from './../componentes/turnos-especialista/turnos-especialista.component'
import {EstadisticasComponent} from './../componentes/estadisticas/estadisticas.component';
import { Aux1Component } from './../componentes/aux1/aux1.component';
import { RegistrosComponent } from './../componentes/registros/registros.component'
  import { CancelarTurnoComponent } from '../componentes/cancelar-turno/cancelar-turno.component';
import { TurnosAdminComponent } from '../componentes/turnos-admin/turnos-admin.component';
import { EncuestasAdminComponent } from '../componentes/encuestas-admin/encuestas-admin.component';
import {ActivadorService} from './../servicios/activador.service';

// declaro donde quiero que se dirija
const MiRuteo = [
  //paginas que no son de usuarios logueados
{path: 'QuienSoy' , component: QuienSoyComponent},
{path: 'Registro' , component: RegistroComponent},
{path: '' , component: LoginComponent},
{path: 'Login' , component: LoginComponent},

//Admin
{path: 'Admin' , component: AdminPageComponent, canActivate: [ActivadorService]},
{path: 'AltaAdmin', component: AltaAdminComponent, canActivate: [ActivadorService]},
{path: 'Estadistica', component: EstadisticasComponent, canActivate: [ActivadorService]},
{path: 'Estadisticas', component: Aux1Component,
  children:
  [{path: 'Registros', component: RegistrosComponent},
  {path: 'TurnosAdmin', component: TurnosAdminComponent},
  {path: 'EncuestasAdmin', component: EncuestasAdminComponent}], canActivate: [ActivadorService]
},
//Cliente

{path: 'Cliente' , component: ClientePageComponent, canActivate: [ActivadorService]},
{path: 'PedirTurno', component: TurnosClienteComponent, canActivate: [ActivadorService]},
{path: 'ListaTurnos', component: ListaTurnosClienteComponent, canActivate: [ActivadorService]},

//Recepcion
{path: 'Recepcion' , component: RecepcionPageComponent, canActivate: [ActivadorService]},
{path: 'TurnosRecepcion', component: TurnosRecepcionComponent, canActivate: [ActivadorService]},
{path: 'AltaTurnoRecepcion', component: AltaTurnoRecepcionComponent, canActivate: [ActivadorService]},
{path: 'CancelarTurno', component: CancelarTurnoComponent, canActivate: [ActivadorService]},

//Especialista
{path: 'Especialista' , component: EspecialistaPageComponent, canActivate: [ActivadorService]},
{path: 'TurnosEspecialista', component: TurnosEspecialistaComponent, canActivate: [ActivadorService]},

//De error

{path: '**' , component: ErrorComponent},

{path: 'error' , component: ErrorComponent}];

@NgModule({
  imports: [
    RouterModule.forRoot(MiRuteo)
  ],
  exports: [
    RouterModule
  ]
})
export class RuteandoModule { }
