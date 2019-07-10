import { Component, OnInit } from '@angular/core';
import {Turnos} from './../../clases/turnos';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-alta-turno-recepcion',
  templateUrl: './alta-turno-recepcion.component.html',
  styleUrls: ['./alta-turno-recepcion.component.css']
})
export class AltaTurnoRecepcionComponent implements OnInit {
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
    this.unTurno.especialista = (<HTMLInputElement>document.getElementById("nombre")).value

    let idTime = Date.now().toString();
    this.db.collection("turnos").doc(idTime).set({

      email: this.unTurno.email,
      especialidad: this.unTurno.especialidad,
      especialista: this.unTurno.especialista,
      estado:"pendiente",
      fechaInicio: this.unTurno.fechaInicio,
      sala: this.unTurno.sala,
      id: idTime,
      solicitante:'recepcion',
      resena:"",
      puntajeEsp:"",
      puntajeCli:"",
      experiencia:"",
      estadoEncuesta:"pendiente"

    })
    .then(function(docRef) {
      console.log("guardo")
      
      
     
  })
  .catch(function(error) {
    console.log(error);
      
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

  MostarMensaje(mensaje:string="este es el mensaje",ganador:boolean=false) {
    this.Mensajes=mensaje;    
    var x = document.getElementById("snackbar");
    if(ganador)
      {
        x.className = "show Ganador";
      }else{
        x.className = "show Perdedor";
      }
    var modelo=this;
    setTimeout(function(){ 
      x.className = x.className.replace("show", "");
      
     }, 3000);
    console.info("objeto",x);
  
   }


}
