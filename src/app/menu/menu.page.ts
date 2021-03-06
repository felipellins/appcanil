import { Component, OnInit } from '@angular/core';
import { Animal } from '../model/animal';
import { DBService } from '../services/db.service';
import { ToastController,LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage  {

  loading: boolean;
  animal: Animal;
  animais:Animal[];
  load:any;

  constructor( private loadingCtrl:LoadingController,private dbService: DBService, public toastController: ToastController, private router:Router) {
    this.init();
  }

 
  visuanimal(animal){
    this.router.navigate(['/adotar', animal.uid])
  }


  private async init() {
   // this.loading = true;

  
    await this.loadAnimais();
  }

  

  private async loadAnimais() {
   
    await this.presentLoading();

    this.dbService.listWithUIDs<Animal>('/animais')
      .then(animais => {
        this.animais = animais;
       // this.loading = false;
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
  private confirmAdd() {
    this.presentToast('Animal adicionado com sucesso');
    this.loadAnimais();
  }

  remove(uid: string) {
    this.dbService.remove('/animais', uid)
      .then(() => {
        this.presentToast('Animal removido com sucesso');
        this.loadAnimais();
      });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }



  userId(){

    
    

  }
 

 

}
