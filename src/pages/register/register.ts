import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ExamPage} from '../exam/exam';
import { ToastController } from 'ionic-angular';
import {TosAndPolicyPage} from '../tos-and-policy/tos-and-policy';
import {AlertController} from 'ionic-angular';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  firstname: string = ''
  username: string = ''
  password: string = ''
  birthday: string = ''
  gender: number
  preference: number
  privacypolicy : boolean
  termsofservice : boolean
  requiredFields : boolean
  constructor(public navCtrl: NavController,
    public navParams: NavParams, 
    public toastController: ToastController,
    public alertCtrl : AlertController) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  readPrivacyPolicy(){
    this.navCtrl.push(TosAndPolicyPage, {privacyPolicy : true})
  }
  readTOS(){
    this.navCtrl.push(TosAndPolicyPage, {TOS: true})
  }
  ionViewWillEnter(){
    if(this.navParams.get("TOSBack")){
      this.termsofservice = true
    }
    if(this.navParams.get("PrivacyPolicyBack")){
      this.privacypolicy = true
    }
  }
  register() {
    let body = {
      firstname: this.firstname,
      username: this.username,
      password: this.password,
      birthday: this.birthday,
      gender: this.gender,
      preference: this.preference,
      submit: true
    }
    this.requiredFields = this.username !== '' && this.firstname !== '' && this.password !== '' && this.password !== '' && this.birthday !== ''
    console.log(this.requiredFields)
    if(this.requiredFields){
      this.navCtrl.push(ExamPage,{data: body});
    }
  }
  async displayToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    })
    toast.present()
  }
}
