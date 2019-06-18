import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {MatSelectModule} from '@angular/material/select';

import { IonicModule } from '@ionic/angular';

import { CadanimalPage } from './cadanimal.page';

const routes: Routes = [
  {
    path: '',
    component: CadanimalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MatSelectModule
  ],
  declarations: [CadanimalPage]
})
export class CadanimalPageModule {}
