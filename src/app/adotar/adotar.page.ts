import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DBService } from '../services/db.service';
import { Animal } from '../model/animal';
import { LoginPage } from '../login/login.page';
import { Usuario } from '../model/usuario';

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

  constructor(private dbService: DBService,private router:Router, private activatedRoute:ActivatedRoute, 
    private login:LoginPage) { 

    
    this.adotaUid = this.login.pegarusuario().currentUser.uid;
    this.loadUsuario();
  }
  
  
  //carregar para deixa pronto
  ngOnInit() {
    this.activatedRoute.params.subscribe(parametros=>{
      if(parametros["uid"] != undefined){
        // carregar do banco
       // console.log(parametros.uid)

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
 
    this.usuario=await this.dbService.listWithUIDs<Usuario>('/usuarios')
  
  }

  adotar(){
  
    

    
  }
  voltmenu(){
    this.router.navigate(['/menu'])
  }

  
}