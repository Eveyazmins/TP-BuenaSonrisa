import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-turnos-admin',
  templateUrl: './turnos-admin.component.html',
  styleUrls: ['./turnos-admin.component.css']
})
export class TurnosAdminComponent implements OnInit {


  coleccionTipadaFirebase:AngularFirestoreCollection<any>;
  ListadoDeMascotas:Observable<any[]>;
  lista: Array<any> = [];
  lista2: Array<any> = [];
  tipo: string;
  mostrar:boolean = false;
  constructor(private db: AngularFirestore) { }

  ngOnInit() {
  }

  listarPedido(tipo: string){
    
    console.log(tipo);
   this.coleccionTipadaFirebase= this.db.collection<any>('turnos', ref => ref.where("solicitante", "==", tipo)); 
    //para el filtrado mirar la documentación https://firebase.google.com/docs/firestore/query-data/queries?authuser=0
    this.ListadoDeMascotas=this.coleccionTipadaFirebase.valueChanges();
    this.ListadoDeMascotas.subscribe(x => {
        this.lista2 = x
        
    });
    this.mostrar=true;
  }

  listarEstado(tipo: string){
    
    console.log(this.tipo);
   this.coleccionTipadaFirebase= this.db.collection<any>('turnos', ref => ref.where("estado", "==", tipo)); 
    //para el filtrado mirar la documentación https://firebase.google.com/docs/firestore/query-data/queries?authuser=0
    this.ListadoDeMascotas=this.coleccionTipadaFirebase.valueChanges();
    this.ListadoDeMascotas.subscribe(x => {
        this.lista2 = x
        
    });
    this.mostrar=true;
  }

}
