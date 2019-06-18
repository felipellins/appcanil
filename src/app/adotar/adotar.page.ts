import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DBService } from '../services/db.service';
import { Animal } from '../model/animal';

@Component({
  selector: 'app-adotar',
  templateUrl: './adotar.page.html',
  styleUrls: ['./adotar.page.scss'],
})
export class AdotarPage implements OnInit {

  animal: Animal;
  constructor(private dbService: DBService,private router:Router, private activatedRoute:ActivatedRoute) { }

  //carregar para deixa pronto
  ngOnInit() {
    this.activatedRoute.params.subscribe(parametros=>{
      if(parametros["uid"] != undefined){
        // carregar do banco
       // console.log(parametros.uid)

        this.dbService.getObject<Animal>("animais/"+parametros.uid)
        .then(animal=>{
          this.animal = animal;
         
        });
      } 
    })

  }

  
}