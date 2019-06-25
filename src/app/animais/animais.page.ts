import { Component, OnInit } from '@angular/core';
import { Animal } from '../model/animal';
import { DBService } from '../services/db.service';
import { ModalController, ToastController } from '@ionic/angular';
import { EditanimalPage } from '../editanimal/editanimal.page';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-animais',
  templateUrl: './animais.page.html',
  styleUrls: ['./animais.page.scss'],
})
export class AnimaisPage  {

  loading: boolean;
  animais: Animal[];

  constructor(private router:Router,public modalController: ModalController, private dbService: DBService, public toastController: ToastController) {
    this.init();
  }

  private async init() {
    this.loading = true;

  
    await this.listarAnimais();
  }

  

  private async listarAnimais() {
    this.dbService.listWithUIDs<Animal>('/animais')
      .then(animais => {
        this.animais = animais;
        this.loading = false;
      }).catch(error => {
        console.log(error);
      });
  }

 

  async add() {
    const modal = await this.modalController.create({
      component:EditanimalPage
    });

    modal.onDidDismiss()
      .then(result => {
        if (result.data) {
          this.confirmAdd();
        }
      });

    return  await modal.present();
  }

  private confirmAdd() {
    this.presentToast('Animal adicionado com sucesso');
    this.listarAnimais()
  }

  remove(uid: string) {
    this.dbService.remove('/animais', uid)
      .then(() => {
        this.presentToast('Animal removido com sucesso');
        this.listarAnimais()
      });
  }
  voltmenu(){
    this.router.navigate(['/menu'])
  }


  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  async edit(animal: Animal) {
    const modal = await this.modalController.create({
      component: EditanimalPage,
      componentProps: {
        editingAnimal: animal
      }
    });

    modal.onDidDismiss()
      .then(result => {
        if (result.data) {
          this.confirmAdd();
        }
      });

    return  await modal.present();
  }

}
