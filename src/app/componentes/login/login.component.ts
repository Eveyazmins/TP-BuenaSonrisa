import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {AuthService} from '../../servicios/auth.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {Usuario} from './../../clases/usuario';

import {Subscription} from "rxjs";
import {TimerObservable} from "rxjs/observable/TimerObservable";
import { controlNameBinding } from '@angular/forms/src/directives/reactive_directives/form_control_name';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private subscription: Subscription;
  tipoUser:string;
  user= { email : '', password : ''};
  Mensaje:string;
  semuestra:boolean;
  progreso: number;
  progresoMensaje="esperando..."; 
  logeando=true;
  logueado:boolean;
  ProgresoDeAncho:string;
  captcha:boolean = false;
  codigoCaptcha:number;
  codigoAleatorio:number;

  clase="progress-bar progress-bar-info progress-bar-striped ";

  dbUsuarios: Observable<any[]>;

  todosLosUsuarios : Usuario[];
  constructor(
    private db: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router,
    public auth : AuthService) {
      this.progreso=0;
      this.ProgresoDeAncho="0%";
      const session = sessionStorage.getItem('user');

          if(session==null)
          {
          this.logueado=false;
          }
          else{
          this.logueado=true;  
          }

          this.dbUsuarios = this.db.collection('usuarios').valueChanges();
    this.todosLosUsuarios = new Array();
    this.ObtenerUsuarios();
  }


  ObtenerUsuarios(){
    this.dbUsuarios.forEach(element => {

      //console.info(element);

      element.forEach(usuario => {

        let unUsr = new Usuario();

        unUsr.email = usuario.email;
        unUsr.tipo = usuario.tipo;
        unUsr.nombre = usuario.nombre;

        this.todosLosUsuarios.push(unUsr);
        
      });

      console.info(this.todosLosUsuarios);
      
    });
  }

  ObtenerPerfil(correo:string):string{    

    let elPerfil:string = '';

    this.todosLosUsuarios.forEach(element => {

      if(correo == element.email){

        console.log(element.tipo);        
        elPerfil = element.tipo;

      }
      
    });

    return elPerfil;
  }


  ngOnInit() {
    this.generarCodigo()
  }

  /*
    Entrar() {
    let perfil = this.ObtenerPerfil(this.user.email);
    if(this.verificarCodigo()){
    this.auth.loginUser(this.user.email,this.user.password ).then((user) => {
      
      sessionStorage.setItem("user",this.user.email);
      sessionStorage.setItem("tipo",perfil);
      
      sessionStorage.setItem("muestra","true");
      switch(perfil){
        case "administrador": 
          this.router.navigate(['Admin']);
          break;
          case "cliente": 
          this.router.navigate(['Cliente']);
          break;
          case "recepcionista": 
          this.router.navigate(['Recepcion']);
          break;
          case "especialista": 
          this.router.navigate(['Especialista']);
          break;
        default:
            this.router.navigate(['Login']);
            break;
      }
      this.logueo();
      }
    )
     .catch(async err=>{
     
      this.progreso=0;
      this.ProgresoDeAncho="0%";
      this.MostarMensaje("Error al loguearse", true);
      this.logeando = true;
      });
    }
    else{
      this.MostarMensaje("Codigo ingresado incorrecto, por favor reingresar", true);
      this.codigoCaptcha = null;
      this.generarCodigo();
    }
    
  }
  */

  Entrar() {
    let perfil = this.ObtenerPerfil(this.user.email);
    
    this.auth.loginUser(this.user.email,this.user.password ).then((user) => {
      
      sessionStorage.setItem("user",this.user.email);
      sessionStorage.setItem("tipo",perfil);
      
      sessionStorage.setItem("muestra","true");
      switch(perfil){
        case "administrador": 
          this.router.navigate(['Admin']);
          break;
          case "cliente": 
          this.router.navigate(['Cliente']);
          break;
          case "recepcionista": 
          this.router.navigate(['Recepcion']);
          break;
          case "especialista": 
          this.router.navigate(['Especialista']);
          break;
        default:
            this.router.navigate(['Login']);
            break;
      }
      this.logueo();
      }
    )
     .catch(async err=>{
     
      this.progreso=0;
      this.ProgresoDeAncho="0%";
      this.MostarMensaje("Error al loguearse", true);
      this.logeando = true;
      });
    
  }

  /*
  MoverBarraDeProgreso() {
   if(this.verificarCodigo())
   {
    this.logeando=false;
    this.clase="progress-bar progress-bar-danger progress-bar-striped active";
    this.progresoMensaje="Iniciando comprobacion"; 
    let timer = TimerObservable.create(200, 50);
    this.subscription = timer.subscribe(t => {
      console.log("inicio");
      this.progreso=this.progreso+1;
      this.ProgresoDeAncho=this.progreso+20+"%";
      switch (this.progreso) {
        case 15:
        this.clase="progress-bar progress-bar-warning progress-bar-striped active";
        this.progresoMensaje="Verificando Usuario..."; 
          break;
        case 30:
          this.clase="progress-bar progress-bar-Info progress-bar-striped active";
          this.progresoMensaje="Verificando contraseña.."; 
          break;
          case 60:
          this.clase="progress-bar progress-bar-success progress-bar-striped active";
          this.progresoMensaje="Recompilando Info del dispositivo..";
          break;
          case 75:
          this.clase="progress-bar progress-bar-success progress-bar-striped active";
          this.progresoMensaje="Desencriptacion de clave ..";
          break;
          case 85:
          this.clase="progress-bar progress-bar-success progress-bar-striped active";
          this.progresoMensaje="Clave ok, ingresando..";
          break;
          
        case 100:
          console.log("final");
          this.subscription.unsubscribe();
          this.Entrar();
          break;
      }     
    });
  }
  else{
    this.MostarMensaje("Codigo ingresado incorrecto, por favor reingresar", true);
    this.codigoCaptcha = null;
    this.generarCodigo();
  }
    //this.logeando=true;
  }
  */

 MoverBarraDeProgreso() {

   this.logeando=false;
   this.clase="progress-bar progress-bar-danger progress-bar-striped active";
   this.progresoMensaje="Iniciando comprobacion"; 
   let timer = TimerObservable.create(200, 50);
   this.subscription = timer.subscribe(t => {
     console.log("inicio");
     this.progreso=this.progreso+1;
     this.ProgresoDeAncho=this.progreso+20+"%";
     switch (this.progreso) {
       case 15:
       this.clase="progress-bar progress-bar-warning progress-bar-striped active";
       this.progresoMensaje="Verificando Usuario..."; 
         break;
       case 30:
         this.clase="progress-bar progress-bar-Info progress-bar-striped active";
         this.progresoMensaje="Verificando contraseña.."; 
         break;
         case 60:
         this.clase="progress-bar progress-bar-success progress-bar-striped active";
         this.progresoMensaje="Recompilando Info del dispositivo..";
         break;
         case 75:
         this.clase="progress-bar progress-bar-success progress-bar-striped active";
         this.progresoMensaje="Desencriptacion de clave ..";
         break;
         case 85:
         this.clase="progress-bar progress-bar-success progress-bar-striped active";
         this.progresoMensaje="Clave ok, ingresando..";
         break;
         
       case 100:
         console.log("final");
         this.subscription.unsubscribe();
         this.Entrar();
         break;
     }     
   });

 }

  borrar()
    {
      this.user.email=null;
      this.user.password=null;
    }

    admin()
    {
      this.user.email="admin@sonrisa.com";
        this.user.password="111111";
    }

    invitado()
    {
      this.user.email="cliente@sonrisa.com";
        this.user.password="111111";
    }

    recepcionista()
    {
      this.user.email="recepcionista@sonrisa.com";
      this.user.password="111111";
    }

    especialista()
    {
      this.user.email="especialista@sonrisa.com";
      this.user.password="111111";
    }


    MostarMensaje(mensaje:string,gano:boolean) {
       this.Mensaje = mensaje;
      var x = document.getElementById("snackbar");
      if(gano)
          x.className = "show Ganador";
      var modelo = this;
      setTimeout(function(){ 
        x.className = x.className.replace("show", "");
        //modelo.ocultarVerificar=false;
       }, 3000);
      console.info("objeto",x);
    
     } 

     /*resolved(captchaResponse: string) {
      console.log(`Resolved captcha with response: ${captchaResponse}`);
      this.captcha = true;
      }*/
      
      generarCodigo()
      {
        this.codigoAleatorio = Math.floor(Math.random() * (999999 - 100000)) + 100000;
        console.log(this.codigoAleatorio);
      }

      verificarCodigo()
      {
        console.log("codigo ingresasdo " , this.codigoCaptcha);
        console.log("codigo aleatorio " ,  this.codigoAleatorio);
        if(this.codigoAleatorio == this.codigoCaptcha)
        {
          return true;
        }
        else
          return false
      }

     logueo()
     {
       let fecha = Date.now();
       let email = this.user.email;

       this.db.collection("logueos").add({

        email: email,
        fecha: fecha
  
      })
      .then(function(docRef) {
        console.log("SSe guardo el logueo");
        
       
    })
    .catch(function(error) {
        console.log("Error al registrar el logueo")
        
    });

     }
   
}
