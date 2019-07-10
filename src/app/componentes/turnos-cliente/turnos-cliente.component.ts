import { Component, OnInit } from '@angular/core';
import {Turnos} from './../../clases/turnos';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-turnos-cliente',
  templateUrl: './turnos-cliente.component.html',
  styleUrls: ['./turnos-cliente.component.css']
})
export class TurnosClienteComponent implements OnInit {


  coleccionTipadaFirebase:AngularFirestoreCollection<any>;
  ListadoDeMascotas:Observable<any[]>;
  lista: Array<any> = [];
  unTurno: Turnos;
  Mensajes:string;
  constructor(private db: AngularFirestore) { 
    this.unTurno = new Turnos();

    
    
  }
  sala()
  {
    switch(this.unTurno.especialidad)
    {
      case "clinico": 
        this.unTurno.sala = "CONS0" + (Math.floor(Math.random()*(7-1) + 1).toString());
        break;
        case "imagenes":
          this.unTurno.sala = "IMAG08";
          break;
        case "mecanico":
          this.unTurno.sala = "MECA09";
        break;

    }
  }

  enviar()
  {
    this.sala();
    this.unTurno.email = sessionStorage.getItem("user");
    this.unTurno.especialista = (<HTMLInputElement>document.getElementById("nombre")).value
    console.log(this.unTurno);
    let idTime = Date.now().toString();
    
    this.db.collection("turnos").doc(idTime).set({

      email: this.unTurno.email,
      especialidad: this.unTurno.especialidad,
      especialista: this.unTurno.especialista,
      estado:"pendiente",
      fechaInicio: this.unTurno.fechaInicio,
      sala: this.unTurno.sala,
      id: idTime,
      solicitante:'cliente',
      resena:"",
      puntajeEsp:"",
      puntajeCli:"",
      experiencia:"",
      estadoEncuesta:"pendiente"

    })
    .then(function(docRef) {
      console.log("Se guarda el turno en base ");
      
     
  })
  .catch(function(error) {
      alert("Error al registrar el turno, realizarlo nuevamente")
      
  });
  this.MostarMensaje("Se ha guardado el turno");
  setTimeout(function(){ 
    window.location.reload();
  }, 3000);
    
  }

  aListar(e)
  {
    this.listar()
  }


  listar()
   {
    this.coleccionTipadaFirebase= this.db.collection<any>('empleados', ref => ref.where("especialidad", "==", this.unTurno.especialidad)); 
    //para el filtrado mirar la documentación https://firebase.google.com/docs/firestore/query-data/queries?authuser=0
    this.ListadoDeMascotas=this.coleccionTipadaFirebase.valueChanges();
    this.ListadoDeMascotas.subscribe(x => {
        this.lista = x
         
    });
  
  }

  ngOnInit() {
    
  }


  MostarMensaje(mensaje:string="este es el mensaje") {
    this.Mensajes=mensaje;    
    var x = document.getElementById("snackbar")
        x.className = "show Ganador";
  
   }

}
