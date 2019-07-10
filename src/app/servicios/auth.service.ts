import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth :  AngularFireAuth) { 
    console.log('Hello AuthProvider Provider');
  }

  registerUser(email:string, password:string){
    return this.afAuth.auth.createUserWithEmailAndPassword( email, password)
    .then((res)=>{
     console.log("el usuario se ha creado exitosamente")
    })
    .catch(err=>Promise.reject(err))
 }

   // Login de usuario
 public loginUser(email:string, password:string){
  return this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then(user=>Promise.resolve(user))
    .catch(err=>Promise.reject(err))
}

// Devuelve la session
public get Session(){
 return this.afAuth.authState;
}

 // Logout de usuario
public logout(){
  this.afAuth.auth.signOut().then(()=>{
    // hemos salido
  })
}

isLoggedIn() {
  console.log("esto es afuera")
  if (this.Session) {
    console.log("entre a validacion")
    return  true;
  } else {
// No user is signed in.
  }
  return false;
}
}
