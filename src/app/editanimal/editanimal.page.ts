import { Component, OnInit } from '@angular/core';
import { Animal } from '../model/animal';
import { DBService } from '../services/db.service';
import { ToastController, MenuController, } from '@ionic/angular';
import {  Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

// camera
import { CameraService } from '../services/camera.service';
import { Camera } from '@ionic-native/camera/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-editanimal',
  templateUrl: './editanimal.page.html',
  styleUrls: ['./editanimal.page.scss'],
  providers: [CameraService, Camera, Base64],
})
export class EditanimalPage implements OnInit {

  editingAnimal: Animal;

  novoAnimal: Animal;
  private animaiscollection:AngularFirestoreCollection<Animal>;
  

  constructor( public modalController: ModalController,private router:Router,private dbService: DBService,public toastCtrl:ToastController,
     private menu: MenuController,private cameraService: CameraService,private afs: AngularFirestore) {
      
      this.novoAnimal = new Animal();
      this.animaiscollection=this.afs.collection<Animal>('animais');
      
    
  }

  ngOnInit() {
      if (this.editingAnimal) {
          this.novoAnimal= this.editingAnimal;
      }
  }


  save()  {
    this.menu.enable(true, 'first');
    this.menu.open('first');
    
      if (this.editingAnimal) {
         this.edit();
      } else {
      
        console.log("errrorr");
      }
  }
  async presentToast(message:string){
      
    const toast=await this.toastCtrl.create({ 
      message:message,
      duration:2000
    });
     toast.present();

  }  


  private edit() {
   
      const updatingObject = { nome: this.novoAnimal.nome,porte:this.novoAnimal.porte,
                               raca:this.novoAnimal.raca,cor: this.novoAnimal.cor,tipo: this.novoAnimal.tipo
                              
      }
     
      this.dbService.update('/animais/'+this.novoAnimal.uid, updatingObject)
          .then(() => { 
           this.modalController.dismiss(this.novoAnimal);         
          this.presentToast('Animal alterado com sucesso');
          this.router.navigate(['/animais'])
          }).catch(error => {
              console.log(error);
          });
  }
  voltanimais(){

    this.router.navigate(['/animais'])
  }
  
 

 
}