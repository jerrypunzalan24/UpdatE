import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RegisterPage} from '../register/register';

import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient, public toastController: ToastController) {
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.http.get("http://localhost:80/update/sample/").subscribe((res)=>{
      console.log(res)
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
    console.log(body)
    if(body.username !== undefined && body.password !== undefined){
    this.http.post("http://localhost:80/update/authentication/",body).subscribe( data => {
      if(data[0].success){
        this.displayToast("Login success!")
      }
      else{
        this.displayToast("Incorrect username and password")
      }
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
