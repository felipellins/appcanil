import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { ModalController, ToastController } from '@ionic/angular';
import { Usuario } from '../model/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario: Usuario;

  constructor(private router:Router,
    private afAuth: AngularFireAuth,
    public toastCtrl: ToastController,
    public modalController: ModalController,
   ) {

      this.usuario = new Usuario;

     }

    entrar(){
      this.afAuth.auth.signInWithEmailAndPassword(this.usuario.email, this.usuario.password)
      .then(result =>{
        this.router.navigate(['/menu']);
      })
      .catch(erro =>{
        this.presentToast('E-mail ou senha incorreto');
        delete this.usuario.password;
      })
    }
    pegarusuario(){
     
     this.usuario;
      

    }
   
    async presentToast(message: string){
      const toast = await this.toastCtrl.create({
        message: message,
        duration: 3000
      });
      toast.present();
    }

  register(){
   
     this.router.navigate(['/register'])
  }
  ngOnInit() {
  }

}
