import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';
import { ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
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
  firstname: string
  username: string
  password: string
  birthday: string
  gender: number
  preference: number
  hostname: string = "http://updateaws-env.pvfiwbdpgp.us-east-2.elasticbeanstalk.com/"
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient, public toastController: ToastController) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
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
    console.log(body.birthday)
    if(body.username !== '' && body.firstname !== '' && body.password !== '' && body.password !== '' && body.birthday !== ''){
    this.http.post(this.hostname + "register", body).subscribe(res => {
      this.displayToast("Register success!")
      this.navCtrl.setRoot(LoginPage);
      console.log(res)
    }, err => {
      this.displayToast("Register failed. Maybe check your internet connetion")
      console.log(err)
    })
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
