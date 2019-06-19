import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

import {StorageServiceProvider} from '../../providers/storage-service/storage-service';
import {NavController} from 'ionic-angular';
import { LoginPage } from '../login/login';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor(private storageService : StorageServiceProvider, public navCtrl : NavController) {
    if(this.storageService.get("account_data") === undefined){
      this.navCtrl.setRoot(LoginPage)
    }
  }
}
