import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { LoginPage } from '../login/login.page';
// page criada para navegação segura de rotas
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor( private LoginPage:LoginPage,
              private router:Router

  ){ }

  // serve para apenas abrir pagina estando cadastrado
  
  
  canActivate():Promise<boolean>{
    return new Promise(resolve =>{
      this.LoginPage.pegarusuario().onAuthStateChanged(user =>{
        if(!user) this.router.navigate(['/login']);
         
        resolve(user ? true:false);
      })

    })
  }
        

  
}
