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

  usuario:Usuario;
  login:LoginPage;
  animal: Animal;
  constructor(private dbService: DBService,private router:Router, private activatedRoute:ActivatedRoute) { 

    this.usuario = new Usuario;
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
  adotar(){
  //this.usuario:this.login.pegarusuario
  }
  voltmenu(){
    this.router.navigate(['/menu'])
  }

  
}