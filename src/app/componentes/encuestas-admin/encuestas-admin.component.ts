import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-encuestas-admin',
  templateUrl: './encuestas-admin.component.html',
  styleUrls: ['./encuestas-admin.component.css']
})
export class EncuestasAdminComponent implements OnInit {

  coleccionTipadaFirebase:AngularFirestoreCollection<any>;
  ListadoDeMascotas:Observable<any[]>;
  lista: Array<any> = [];
  lista2: Array<any> = [];

  constructor(private db: AngularFirestore) { 

   
   this.coleccionTipadaFirebase= this.db.collection<any>('turnos', ref => ref.where("estado", "==", "completado")); 
    //para el filtrado mirar la documentación https://firebase.google.com/docs/firestore/query-data/queries?authuser=0
    this.ListadoDeMascotas=this.coleccionTipadaFirebase.valueChanges();
    this.ListadoDeMascotas.subscribe(x => {
        this.lista2 = x
        
    });
  }

  ngOnInit() {
  }

}
