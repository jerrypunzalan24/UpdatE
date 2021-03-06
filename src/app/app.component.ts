import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import {StorageServiceProvider} from '../providers/storage-service/storage-service';
import { GalleryPage } from '../pages/gallery/gallery';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = (this.storageService.get("account_data") === undefined) ? LoginPage : TabsPage
  // rootPage: any = GalleryPage
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private storageService : StorageServiceProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
