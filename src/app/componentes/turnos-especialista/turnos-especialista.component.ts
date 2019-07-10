import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-turnos-especialista',
  templateUrl: './turnos-especialista.component.html',
  styleUrls: ['./turnos-especialista.component.css']
})
export class TurnosEspecialistaComponent implements OnInit {

  coleccionTipadaFirebase:AngularFirestoreCollection<any>;
  ListadoDeMascotas:Observable<any[]>;
  lista: Array<any> = [];
  email: string;
  estado:string;
  nombre: string;
  muestra:boolean;
  resena:string;
  MostarMensaje:string

  constructor(private db: AngularFirestore) {
    this.email= sessionStorage.getItem("user");
    console.log(this.email);
    this.coleccionTipadaFirebase= this.db.collection<any>('turnos', ref => ref.where("emailEspecialista", "==", this.email)); 
    //para el filtrado mirar la documentación https://firebase.google.com/docs/firestore/query-data/queries?authuser=0
    this.ListadoDeMascotas=this.coleccionTipadaFirebase.valueChanges();
    this.ListadoDeMascotas.subscribe(x => {
        this.lista = x
        
    });
   }
   mostrar(id:string)
   {
     console.log(id);
     this.muestra = true;
     
   }

   completar(id:string)
  {
        let washingtonRef = this.db.collection("turnos").doc(id);

        // Set the "capital" field of the city 'DC'
        return washingtonRef.update(
          {
          estado:'completado',
          resena:this.resena
        },
        )
        .then(function() {
            console.log("Se completa el turno");
            setTimeout(function(){ 
              window.location.reload();
            }, 3000);
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
            
        
  }

  ngOnInit() {
  }

}
