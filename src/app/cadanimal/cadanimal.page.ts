import { Component, OnInit } from '@angular/core';
import { Animal } from '../model/animal';
import { DBService } from '../services/db.service';
import { ToastController, MenuController } from '@ionic/angular';
import {  Router } from '@angular/router';


// camera
import { CameraService } from '../services/camera.service';
import { Camera } from '@ionic-native/camera/ngx';
import { Base64 } from '@ionic-native/base64/ngx';


@Component({
  selector: 'app-cadanimal',
  templateUrl: './cadanimal.page.html',
  styleUrls: ['./cadanimal.page.scss'],
  providers: [CameraService, Camera, Base64],
})
export class CadanimalPage implements OnInit {

  editingAnimal: Animal;

  novoAnimal: Animal;

  

  constructor( private router:Router,private dbService: DBService,public toastCtrl:ToastController, private menu: MenuController,private cameraService: CameraService) {
      this.novoAnimal = new Animal();
    
  }

  ngOnInit() {
      if (this.editingAnimal) {
          this.novoAnimal= this.editingAnimal;
      }
  }


  save()  {
    this.menu.enable(true, 'first');
    this.menu.open('first');
      /*if (this.editingAnimal) {
          this.edit();
      } else {
          this.insert();
      }*/
  }
  async presentToast(message:string){
      
    const toast=await this.toastCtrl.create({ 
      message:message,
      duration:2000
    });
     toast.present();

  }  


  private edit() {
      const updatingObject = { name: this.novoAnimal.nome, cor: this.novoAnimal.cor,tipo: this.novoAnimal.tipo, uid: this.novoAnimal.uid 
      };
      this.dbService.update('/animais', updatingObject)
          .then(() => {          
         this.presentToast('Animal cadastrado com sucesso');
        // this.voltlogin();
          }).catch(error => {
              console.log(error);
          });
  }
  voltlogin(){

    this.router.navigate(['/login'])
  }
  
  async takePhoto() {
    this.novoAnimal.picture = await this.cameraService.takePhoto();
}

  private insert() {
      this.dbService.insertInList<Animal>('/animais', this.novoAnimal)
          .then(() => {
          this.presentToast('Animal cadastrado com sucesso');
          this.router.navigate(['/animais']);
        
          }).catch(error => {
              console.log(error);
          });
  }
}