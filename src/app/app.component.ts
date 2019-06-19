import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import {ChatPage} from '../pages/chat/chat';
import {StorageServiceProvider} from '../providers/storage-service/storage-service';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private storageService : StorageServiceProvider) {
    platform.ready().then(() => {
      console.log(this.storageService.get("account_data"))
      this.rootPage = (this.storageService.get("account_data") === undefined) ? LoginPage : TabsPage
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}