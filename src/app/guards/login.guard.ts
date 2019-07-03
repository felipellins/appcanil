import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginPage } from '../login/login.page';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
      constructor( private LoginPage:LoginPage,
        private router:Router

    ){ }


// redireciona para o home se tiver logado 

canActivate():Promise<boolean>{
  return new Promise(resolve =>{
  this.LoginPage.pegarusuario().onAuthStateChanged(user =>{
    if(user) this.router.navigate(['/menu'])

        resolve(!user ? true:false);
    })

    })
    }



}

