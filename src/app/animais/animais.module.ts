import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';


import { IonicModule } from '@ionic/angular';

import { AnimaisPage } from './animais.page';
import { EditanimalPage } from '../editanimal/editanimal.page';

const routes: Routes = [
  {
    path: '',
    component: AnimaisPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AnimaisPage,EditanimalPage],
  entryComponents: [EditanimalPage]
})
export class AnimaisPageModule {}
