import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Usuario } from './model/usuario';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  // pagina a ser iniciada primerio
  
  public opcoesApp = [
    {
      title: 'Cadastrar Animal',
      url: '/cadanimal',
      icon: 'paw'
    },
    {
      title: 'Ver animais',
      url: '/animais',
      icon: 'paw' 
    },{
      title: 'Inicio',
      url: '/menu',
      icon: 'paw' 
    }
   
  ];
  
  usuario: Usuario;
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private fAuth: AngularFireAuth
  ) {
    this.inicializarApp();
  }
  login() {
    this.fAuth.auth.signOut()
    .then(resultado => {
      this.router.navigate(["/login"]);
    })
  }

  inicializarApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
