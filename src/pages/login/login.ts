import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RegisterPage} from '../register/register';

import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import {StorageServiceProvider} from '../../providers/storage-service/storage-service';
import { HomePage } from '../home/home';
import {TabsPage} from '../tabs/tabs';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username: String;
  password: String;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient, public toastController: ToastController, private storageProvider : StorageServiceProvider) {
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.http.get("http://192.168.254.100:80/update/sample/").subscribe((res)=>{
      this.displayToast("Connected successfully")
    }, err =>{
      this.displayToast("Connnection failed")
    })

  }
  gotoregister(){
    this.navCtrl.push(RegisterPage)
  }
  login(){
    let body = {
      username: this.username,
      password: this.password,
      submit: true
    }
    if(body.username !== undefined && body.password !== undefined){
    this.http.post("http://192.168.254.100:80/update/authentication/",body).subscribe( data => {
      if(data[0].success){
        this.storageProvider.set("account_data", data)
        this.navCtrl.setRoot(TabsPage)
      }
      else{
        this.displayToast("Incorrect username and password")
      }
    }, error =>{
      this.displayToast("Request failed. Maybe check your internet connection")
    })
  }
  else{
    this.displayToast("Fill all the following fields")
  }
}
async displayToast(msg){
  const toast = await this.toastController.create({
    message: msg,
    duration: 2000
  })
  toast.present()
}

}
