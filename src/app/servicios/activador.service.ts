import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Router }  from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import {Usuario} from '../clases/usuario';
import {AuthService} from './../servicios/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ActivadorService implements CanActivate {

  constructor(private router: Router, private auth: AuthService) {

   
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {

   
     let url: string = state.url;
     console.log('url dentro de canActivate', url);
     console.log(route);
     console.log("estado ", state);
     console.log(this.auth.isLoggedIn())
     if ( sessionStorage.getItem("user") )
     {
       return true;
     }
     else
     {
       console.log("Tenes que loguearte")
       this.router.navigate(['Login']);
       return !true;
     }
}
}