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
  hostname : String = "http://updateaws-env.pvfiwbdpgp.us-east-2.elasticbeanstalk.com/";
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient, public toastController: ToastController, private storageProvider : StorageServiceProvider) {
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.http.get(this.hostname + "accounts").subscribe((res)=>{
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
    this.http.post( this.hostname + "authentication",body).subscribe( data => {
      if(data['error'] === undefined){
        this.storageProvider.set("account_data", data)
        console.log(data)
        this.navCtrl.setRoot(TabsPage)
      }
      else{
        this.displayToast("Incorrect username and password")
      }
    }, error =>{
      this.displayToast("Request failed. Maybe check your internet connection")
      console.log(error.error)
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
