import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'animais', loadChildren: './animais/animais.module#AnimaisPageModule' },
  { path: 'cadanimal', loadChildren: './cadanimal/cadanimal.module#CadanimalPageModule' },
  { path: '', loadChildren: './menu/menu.module#MenuPageModule' },
  { path: 'menu', loadChildren: './menu/menu.module#MenuPageModule' },
  { path: 'adotar/:uid', loadChildren: './adotar/adotar.module#AdotarPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
