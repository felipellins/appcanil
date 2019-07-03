import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {FormsModule} from '@angular/forms';
// fire base
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireAuth} from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireDatabase } from "@angular/fire/database";
import { DBService } from './services/db.service';
import { LoginPage } from './login/login.page';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
  // pages 
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    FormsModule
  // outros 
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    AngularFireAuth,
    AngularFireDatabase,
    LoginPage ,
    DBService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
