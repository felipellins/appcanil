import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule',canActivate: [LoginGuard] },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'animais', loadChildren: './animais/animais.module#AnimaisPageModule',canActivate: [AuthGuard] },
  { path: '', loadChildren: './menu/menu.module#MenuPageModule' },
  { path: 'menu', loadChildren: './menu/menu.module#MenuPageModule',canActivate: [AuthGuard] },
  { path: 'adotar', loadChildren: './adotar/adotar.module#AdotarPageModule',canActivate: [AuthGuard] },
  { path: 'adotar/:uid', loadChildren: './adotar/adotar.module#AdotarPageModule',canActivate: [AuthGuard] },
  { path: 'cadanimal', loadChildren: './cadanimal/cadanimal.module#CadanimalPageModule',canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
