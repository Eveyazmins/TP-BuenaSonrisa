import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {Turnos} from './../../clases/turnos';

@Component({
  selector: 'app-turnos-recepcion',
  templateUrl: './turnos-recepcion.component.html',
  styleUrls: ['./turnos-recepcion.component.css']
})
export class TurnosRecepcionComponent implements OnInit {

  unTurno: Turnos;
  coleccionTipadaFirebase:AngularFirestoreCollection<any>;
  ListadoDeMascotas:Observable<any[]>;
  lista: Array<any> = [];
  hacer:boolean = false;
 
  constructor(private db: AngularFirestore) {
    

    this.coleccionTipadaFirebase= this.db.collection<any>('turnos');
    //para el filtrado mirar la documentación https://firebase.google.com/docs/firestore/query-data/queries?authuser=0
    this.ListadoDeMascotas=this.coleccionTipadaFirebase.valueChanges();
    this.ListadoDeMascotas.subscribe(x => {
        this.lista = x
        
    });
   }



   cambiaBool()
   {
      this.hacer = true;
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
        case "mecanica":
          this.unTurno.sala = "MECA09";
        break;

    }
  }

  enviar()
  {
    this.sala();
    this.unTurno.especialista = (<HTMLInputElement>document.getElementById("nombre")).value;
    console.log(this.unTurno);

    /*
    this.db.collection("turnos").add({

      email: this.unTurno.email,
      especialidad: this.unTurno.especialidad,
      especialista: this.unTurno.especialista,
      estado:"pendiente",
      fechaInicio: this.unTurno.fechaInicio,
      sala: this.unTurno.sala

    })
    .then(function(docRef) {
      console.log("Se guarda el turno en base ");
      
     
  })
  .catch(function(error) {
      alert("Error al registrar el turno, realizarlo nuevamente")
      
  });
  */
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
    this.unTurno = new Turnos();
  }

}
