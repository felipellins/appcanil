import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DBService } from '../services/db.service';
import { Animal } from '../model/animal';
import { LoginPage } from '../login/login.page';
import { Usuario } from '../model/usuario';
import { ToastController, LoadingController } from '@ionic/angular';
import { Adotados } from '../model/adotados';


@Component({
  selector: 'app-adotar',
  templateUrl: './adotar.page.html',
  styleUrls: ['./adotar.page.scss'],
})
export class AdotarPage implements OnInit {

  usuario:Usuario[];
  loginPage:LoginPage;
  animal: Animal;

  adotaUid:string;
  load:any;
  uidanimal:string;
  adotados :Adotados;

  constructor(private loadingCtrl:LoadingController,private dbService: DBService,private router:Router, private activatedRoute:ActivatedRoute, 
    private login:LoginPage,public toastCtrl:ToastController) {
      this.loadUsuario();

    this.adotados= new Adotados;
    this.adotaUid = this.login.pegarusuario().currentUser.uid;
   
  }
  private async init() {
   
   
     await this.loadUsuario();
   }
  
  
  //carregar para deixa pronto
  ngOnInit() {
    this.activatedRoute.params.subscribe(parametros=>{
      if(parametros["uid"] != undefined){
        // carregar do banco
       // console.log(parametros.uid)
        
       this.uidanimal=parametros.uid
        this.dbService.getObject<Animal>("animais/"+parametros.uid)
        .then(animal=>{
          this.animal = animal;
         
        }).catch(error => {
          console.log(error);
        });
      } 
    })

    

  }
  private async loadUsuario(){
 
    this.dbService.listWithUIDs<Usuario>('/usuarios')
    .then(usuarios => {
      this.usuario = usuarios;
     
     this.load.dismiss();
    }).catch(error => {
    
    });
  
  }

  async presentToast(message:string){
      
    const toast=await this.toastCtrl.create({ 
      message:message,
      duration:2000
    });
     toast.present();

  }  
  async adotar(usu:Usuario){
  
    this.adotados.uidAnimal=this.uidanimal;
    this.adotados.uidDono=usu.uid;
    this.adotados.nomeAnimal=this.animal.nome;
    this.dbService.insertInList<Adotados>('/adotados', this.adotados)
    .then(() => {
     this.presentToast('Animal adotado com sucesso');
    this.router.navigate(['/adotados']);
  
    }).catch(error => {
        console.log(error);
    });


    
  }
  voltmenu(){
    this.router.navigate(['/menu'])
  }
  

  
}