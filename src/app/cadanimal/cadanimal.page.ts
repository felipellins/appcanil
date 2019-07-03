import { Component, OnInit } from '@angular/core';
import { Animal } from '../model/animal';
import { DBService } from '../services/db.service';
import { ToastController, MenuController, } from '@ionic/angular';
import {  Router } from '@angular/router';

 // camera
import { CameraService } from '../services/camera.service';
import { Camera } from '@ionic-native/camera/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { LoginPage } from '../login/login.page';



@Component({
  selector: 'app-cadanimal',
  templateUrl: './cadanimal.page.html',
  styleUrls: ['./cadanimal.page.scss'],
  providers: [CameraService, Camera, Base64],
})
export class CadanimalPage implements OnInit {
 
  editingAnimal: Animal;

  novoAnimal: Animal;
 
  

  constructor( private router:Router,private dbService: DBService,public toastCtrl:ToastController, 
    private menu: MenuController,private cameraService: CameraService,
    private login:LoginPage ) {
      this.novoAnimal = new Animal();

    
  }

  ngOnInit() {
     
  }


  save()  {
    this.menu.enable(true, 'first');
    this.menu.open('first');
     
          this.insert();
      
  }
  async presentToast(message:string){
      
    const toast=await this.toastCtrl.create({ 
      message:message,
      duration:2000
    });
     toast.present();

  }  

  voltlogin(){

    this.router.navigate(['/animais'])
  }
  
  async takePhoto() {
    this.novoAnimal.picture = await this.cameraService.takePhoto();
}

  private insert() {
    this.novoAnimal.useruid=this.login.pegarusuario().currentUser.uid;

      this.dbService.insertInList<Animal>('/animais', this.novoAnimal)
          .then(() => {
          this.presentToast('Animal cadastrado com sucesso');
          this.router.navigate(['/animais']);
        
          }).catch(error => {
              console.log(error);
          });
  }
}