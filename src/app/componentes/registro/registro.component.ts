import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import { AuthService} from './../../servicios/auth.service';
import { Usuario } from './../../clases/usuario';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
//para poder hacer las validaciones
import { Validators, FormBuilder, FormControl, FormGroup} from '@angular/forms';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

 

  unUsuario: Usuario;
  items: Observable<any[]>;

  constructor( private db: AngularFirestore, private storage: AngularFireStorage, private auth : AuthService,  private router : Router) {
    this.unUsuario = new Usuario();
    this.items = db.collection('items').valueChanges();
   }

  ngOnInit() {
  }

  onUpload(e)
  {
    let id= "cliente - "+this.unUsuario.email;
    let file = e.target.files[0];
    let filePath = 'clientes/'+id+'.jpg';
    let ref = this.storage.ref(filePath);
    let task = this.storage.upload(filePath, file);
    
  }


  enviar()
  {
    this.unUsuario.tipo = "cliente";
    this.unUsuario.id = "cliente - "+this.unUsuario.email;
    this.unUsuario.foto = "cliente - "+this.unUsuario.email;
    console.log(this.unUsuario);
    this.auth.registerUser(this.unUsuario.email,this.unUsuario.clave)
    .then((unUsuario) => {
      console.log("Alta exitosa");
      console.log(this.unUsuario);
      sessionStorage.setItem('user', this.unUsuario.email);
      sessionStorage.setItem('tipo', "cliente");
      this.router.navigate(['Cliente']);
    })
    .catch(err=>{
     console.log("No se ha podido registrar el usuario");
    })

    this.db.collection("usuarios").doc("cliente - " + this.unUsuario.email).set({

      email: this.unUsuario.email,
      clave: this.unUsuario.clave,
      tipo: "cliente",
      id: "cliente - "+this.unUsuario.email,
      foto:  "cliente - "+this.unUsuario.email,
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
