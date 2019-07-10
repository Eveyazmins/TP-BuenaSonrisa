import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Turnos } from './../../clases/turnos';

@Component({
  selector: 'app-cancelar-turno',
  templateUrl: './cancelar-turno.component.html',
  styleUrls: ['./cancelar-turno.component.css']
})

export class CancelarTurnoComponent implements OnInit {
  @Input() idTurno: string;
  coleccionTipadaFirebase:AngularFirestoreCollection<any>;
  ListadoDeMascotas:Observable<any[]>;
  lista: Array<any> = [];
  turno: any;

  
  constructor(private db: AngularFirestore) {



   }

  cancelar()
  {
        let washingtonRef = this.db.collection("turnos").doc(this.idTurno)

        // Set the "capital" field of the city 'DC'
        return washingtonRef.update(
          {
          estado:'cancelado'
        },
        )
        .then(function() {
            console.log("Se cancelo el turno");
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
        
  }

  ngOnInit() {
  }

}
