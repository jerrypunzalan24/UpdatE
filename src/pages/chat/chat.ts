
import { IonicPage, NavController, NavParams, Events, Content } from 'ionic-angular';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {HttpClient} from '@angular/common/http';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  @ViewChild(Content) content: Content;
  user_id : number
  other_id : number
  username : string
  myMessage : string
  your_avatar : string
  other_avatar : string
  chathistory: any
  constructor(public navCtrl: NavController, public navParams: NavParams, private http : HttpClient) {
    this.user_id = this.navParams.get("user_id")
    this.other_id = this.navParams.get("other_id")
    this.username = this.navParams.get("username")
    this.your_avatar = this.navParams.get("your_avatar")
    this.other_avatar = this.navParams.get("other_avatar")
    this.updateChat()
    this.scrollToBottom()
    setInterval(()=>{
      this.updateChat()
    },1000)
  }
  updateChat(){
    let body = {
      user_id : this.user_id,
      other_id : this.other_id,
      getchat : true
    }
    this.http.post("http://192.168.254.100:80/update/getchathistory/",body).subscribe(res => {
      this.chathistory = res
      console.log(res)
    }, err=>{
      console.log(err)
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }
  sendMessage(){
    let body = {
      user_id : this.user_id,
      other_id : this.other_id,
      message : this.myMessage,
      submit : true
    }
    this.http.post("http://192.168.254.100:80/update/sendmessage/", body).subscribe(res => {
      this.updateChat()
      this.scrollToBottom()
    }, err =>{
      console.log("Error", err)
    })
  }
  onFocus() {
    this.content.resize();
    this.scrollToBottom();
  }
  scrollToBottom() {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    }, 400)
  }
}
