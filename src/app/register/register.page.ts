import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Usuario } from '../model/usuario';
import { ToastController } from '@ionic/angular';
import { DBService } from '../services/db.service';

// camera
import { CameraService } from '../services/camera.service';
import { Camera } from '@ionic-native/camera/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { LoginPage } from '../login/login.page';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  providers: [CameraService, Camera, Base64],
})
export class RegisterPage implements OnInit {
   
  novoUsuario:Usuario;

   loginPage:LoginPage;
 
  constructor(
    private router:Router,
    private afAuth:AngularFireAuth,
    public toastCtrl:ToastController,
    private dbService: DBService,
    private cameraService: CameraService,
    private login:LoginPage
    ) {
       // usando model
       this.novoUsuario= new Usuario;
     }

  cadastrar(){
    this.afAuth.auth.createUserWithEmailAndPassword(this.novoUsuario.email,this.novoUsuario.password)
    
    .then(result=>{
      this.novoUsuario.loginUid=this.login.pegarusuario().currentUser.uid;
     
      this.dbService.insertInList<Usuario>('/usuarios', this.novoUsuario)
      this.presentToast('Usuario cadastrado com sucesso');
      this.voltlogin();
    })
    .catch(error =>{
      this.presentToast('Erro ao cadastrar');
    });
   
  }
  async takePhoto() {
    this.novoUsuario.picture = await this.cameraService.takePhoto();
}

   // configuração de mensagem
    async presentToast(message:string){
      
      const toast=await this.toastCtrl.create({ 
        message:message,
        duration:2000
      });
       toast.present();

    }  


  //nome da função do butao
  voltlogin(){
                        //nome da pagina redirecionamento
    this.router.navigate(['/login'])
  }
  


  ngOnInit() {
  }

}
