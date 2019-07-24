import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TosAndPolicyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tos-and-policy',
  templateUrl: 'tos-and-policy.html',
})
export class TosAndPolicyPage {
  TOS : boolean
  privacyPolicy : boolean
  title : string
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.TOS = this.navParams.get("TOS") || false
    this.privacyPolicy = this.navParams.get("privacyPolicy") || false
    this.title = this.navParams.get("TOS") ? "Terms of Service" : "Privacy Policy" 
  }
  gobackPrivacyPolicy(){
    this.navCtrl.getPrevious().data.PrivacyPolicyBack = true
    this.navCtrl.pop()
  }
  gobackTOS(){
    this.navCtrl.getPrevious().data.TOSBack = true
    this.navCtrl.pop()
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TosAndPolicyPage');
  }

}
