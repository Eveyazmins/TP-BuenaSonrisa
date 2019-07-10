import { Component, OnInit } from '@angular/core';
import { AuthService} from './../../servicios/auth.service';
import { Usuario } from './../../clases/usuario';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Empleado} from './../../clases/empleado'

@Component({
  selector: 'app-alta-admin',
  templateUrl: './alta-admin.component.html',
  styleUrls: ['./alta-admin.component.css']
})
export class AltaAdminComponent implements OnInit {

  unUsuario: Usuario;
  items: Observable<any[]>;
  empleado: Empleado;
  coleccionTipadaFirebase:AngularFirestoreCollection<any>;
  constructor(private db: AngularFirestore, private auth : AuthService,  private router : Router) { 

    this.empleado = new Empleado();
    this.unUsuario = new Usuario();
    this.items = db.collection('usuarios').valueChanges();
  }

  ngOnInit() {
  }

  enviar()
  {
    console.log("usuario ", this.unUsuario);

    this.db.collection("usuarios").doc( this.unUsuario.tipo +" - " + this.unUsuario.email).set({

      email: this.unUsuario.email,
      clave: this.unUsuario.clave,
      tipo: this.unUsuario.tipo,
      id:  this.unUsuario.tipo +" - " + this.unUsuario.email,
      foto:  "sin foto",
      nombre: this.unUsuario.nombre

    })
    .then(function(docRef) {
      console.log("Se guarda el usuario en base ");
      
     
  })
  .catch(function(error) {
      alert("Error al registrarse, realizarlo nuevamente")
      console.error("Error al escribir el usuario", error);
  });

  if( this.coleccionTipadaFirebase= this.db.collection<any>('usuarios', ref => ref.where("email", "==", this.unUsuario.email))){
    this.registrar();
  }
  if(this.unUsuario.tipo == "especialista")
  {
      this.altaEmpleado();
  }
}
  
  registrar()
  {
    this.auth.registerUser(this.unUsuario.email,this.unUsuario.clave)
    .then((unUsuario) => {
      alert("Alta Exitosa")
      console.log("Alta exitosa");
      console.log(this.unUsuario);
      
    })
    .catch(err=>{
     console.log("No se ha podido registrar el usuario");
    })
    setTimeout(function(){ 
      window.location.reload();
    }, 3000);
    
  }

  altaEmpleado()
  {
    this.db.collection("empleados").add({

      email: this.unUsuario.email,
      especialidad: this.empleado.especialidad,
      nombre: this.unUsuario.nombre

    })
    .then(function(docRef) {
      console.log("Se guarda el usuario en base ");
      
     
  })
  .catch(function(error) {
      alert("Error al registrarse, realizarlo nuevamente")
      console.error("Error al escribir el usuario", error);
  });
  }

}
