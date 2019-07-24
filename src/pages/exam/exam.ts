import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HostnameProvider} from '../../providers/hostname/hostname';
import { HttpClient } from '@angular/common/http';
import {LoginPage} from '../login/login';
import { ToastController } from 'ionic-angular';
/**
 * Generated class for the ExamPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-exam',
  templateUrl: 'exam.html',
})
export class ExamPage {
  questions : any
  answers = []
  firstname: string
  username: string
  password: string
  birthday: string
  gender: number
  preference: number
  radio_checked : boolean = true
  constructor(public navCtrl: NavController, public navParams: NavParams, private http : HttpClient, private h : HostnameProvider
    ,public toastController : ToastController) {
    this.firstname = this.navParams.get("data").firstname
    this.username = this.navParams.get("data").username
    this.password = this.navParams.get("data").password
    this.birthday = this.navParams.get("data").birthday
    this.gender = this.navParams.get("data").gender
    this.preference = this.navParams.get("data").preference
    console.log(this.preference)
    console.log(this.firstname)
    this.http.get(this.h.hostname + "getquestions").subscribe((res)=>{
      this.questions = res
      console.log(res)
    }, err =>{
      console.log("Error", JSON.stringify(err))
    })
  }
  submit(){
    let body = {
      firstname : this.firstname,
      username : this.username,
      password : this.password,
      birthday : this.birthday,
      gender : this.gender,
      preference : this.preference,
      answers : this.answers
    }
    this.http.post("http://localhost/update-aws/public/" + "register",body).subscribe((res)=>{
      if(res['error'] === undefined){
        this.displayToast("Register Success!")
        this.navCtrl.setRoot(LoginPage)
      }
      else{
        this.displayToast("Username exist. Try again")
      }
    },err=>{
      this.displayToast("Register failed. Maybe check your internet connection")
      console.log("Register error ", err)
    })
  }
  async displayToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    })
    toast.present()
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ExamPage');
  }

}
