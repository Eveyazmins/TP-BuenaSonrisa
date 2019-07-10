import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Turnos } from './../../clases/turnos';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.css']
})
export class RegistrosComponent implements OnInit {

  coleccionTipadaFirebase:AngularFirestoreCollection<any>;
  ListadoDeMascotas:Observable<any[]>;
  lista: Array<any> = [];
  tipo: string;
  public turnosArray:any = [];
  contMecanica: number;
  contClinico:number;
  contImagenes:number;

  constructor(private db: AngularFirestore) { 

   
  }

  listarLogueo()
  {
    this.lista = null;
    this.coleccionTipadaFirebase= this.db.collection<any>('logueos', ref=> ref.orderBy('fecha')); 
    //para el filtrado mirar la documentación https://firebase.google.com/docs/firestore/query-data/queries?authuser=0
    this.ListadoDeMascotas=this.coleccionTipadaFirebase.valueChanges();
    this.ListadoDeMascotas.subscribe(x => {
        this.lista = x
        
    });
  }

  listarTurnos()
  {
     return this.db.collection('turnos').snapshotChanges().pipe(map(usuarios=>{
      return usuarios.map(a=>{
        const data = a.payload.doc.data() as Turnos;
        data.email = a.payload.doc.id;

        return data;
      })
    }))
  }

  traerUser()
  { 
    this.contClinico = 0;
    this.contMecanica = 0;
    this.contImagenes = 0;

    this.listarTurnos().subscribe(users =>{
      this.turnosArray = users;
      console.log(users);
    })

    this.turnosArray.forEach(element => {

      if(element.especialidad == 'clinico')
        this.contClinico++;
        if(element.especialidad == 'mecanica')
        this.contMecanica++;
        if(element.especialidad == 'imagenes')
        this.contImagenes++;
      
    });
    

  }
  
  mostrar(tipo:string)
  {
    switch(tipo)
    {
      case 'logueos':
        this.tipo = 'logueos';
        this.listarLogueo();
        break;
        case 'turnos':
            this.traerUser();
            this.tipo = 'turnos';
            
            console.log(this.turnosArray);
            break;
    }

  }

  ngOnInit() {
  }

}
