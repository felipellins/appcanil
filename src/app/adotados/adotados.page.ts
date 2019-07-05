import { Component, OnInit } from '@angular/core';
import { Adotados } from '../model/adotados';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { DBService } from '../services/db.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adotados',
  templateUrl: './adotados.page.html',
  styleUrls: ['./adotados.page.scss'],
})
export class AdotadosPage  {
   
  adotados:Adotados[];
  load:any;

  constructor(private loadingCtrl:LoadingController, private router:Router,public modalController: ModalController,
     private dbService: DBService, public toastController: ToastController) { 

     this.init();
     }

     private async init() {
    
   
     
       await this.listarAdotados();
     }

  private async listarAdotados() {
   
    await this.presentLoading();
   
    this.dbService.listWithUIDs<Adotados>('/adotados')
       .then(adotado => {
         this.adotados = adotado;
        this.load.dismiss();
       }).catch(error => {
        this.presentToast(error.message);
       });
      
       
   }
   async presentLoading() {
    this.load= await this.loadingCtrl.create({
     message: 'Por favor aguarde',
    
   });
   return this.load.present();

 }
 async presentToast(message: string) {
  const toast = await this.toastController.create({
    message: message,
    duration: 2000
  });
  toast.present();
}

}
