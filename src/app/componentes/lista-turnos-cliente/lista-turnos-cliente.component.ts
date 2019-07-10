import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Turnos } from './../../clases/turnos';


@Component({
  selector: 'app-lista-turnos-cliente',
  templateUrl: './lista-turnos-cliente.component.html',
  styleUrls: ['./lista-turnos-cliente.component.css']
})
export class ListaTurnosClienteComponent implements OnInit {


  coleccionTipadaFirebase:AngularFirestoreCollection<any>;
  ListadoDeMascotas:Observable<any[]>;
  lista: Array<any> = [];
  email: string;
  estado:string;
  lista2: Array<any> = [];
  muestra:boolean;
  muestra2:boolean;
  turno2: Turnos;
  id:string;
  constructor(private db: AngularFirestore) {
    this.turno2 = new Turnos();
    this.email= sessionStorage.getItem("user");
    this.coleccionTipadaFirebase= this.db.collection<any>('turnos', ref => ref.where("email", "==", this.email)); 
    //para el filtrado mirar la documentación https://firebase.google.com/docs/firestore/query-data/queries?authuser=0
    this.ListadoDeMascotas=this.coleccionTipadaFirebase.valueChanges();
    this.ListadoDeMascotas.subscribe(x => {
        this.lista = x
        
    });
   }

   

  ngOnInit() {
  }

  encuestasPendientes(){
    this.coleccionTipadaFirebase= this.db.collection<any>('turnos', ref => ref.where("email", "==", this.email)); 
    this.coleccionTipadaFirebase= this.db.collection<any>('turnos', ref => ref.where("estado", "==", "completado")); 
    this.coleccionTipadaFirebase= this.db.collection<any>('turnos', ref => ref.where("estadoEncuesta", "==", "pendiente"));
    //para el filtrado mirar la documentación https://firebase.google.com/docs/firestore/query-data/queries?authuser=0
    this.ListadoDeMascotas=this.coleccionTipadaFirebase.valueChanges();
    this.ListadoDeMascotas.subscribe(x => {
        this.lista2 = x
        
    });
    this.muestra= true;
    
  }
  mostrar(id:string)
  {
    this.muestra= true;
    this.muestra2= true;
    this.id = id;
    
  }

  hacer()
  {
    
    console.log(this.turno2 + " id " + this.id);
    let washingtonRef = this.db.collection("turnos").doc(this.id);

        // Set the "capital" field of the city 'DC'
        return washingtonRef.update(
          {
          puntajeEsp: this.turno2.puntajeEsp,
          puntajeCli: this.turno2.puntajeCli,
          experiencia: this.turno2.experiencia,
          estadoEncuesta: "completada"
        },
        )
        .then(function() {
            console.log("Se completa la encuesta");
            
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
        this.muestra = false;
        
  }
  
  

}
