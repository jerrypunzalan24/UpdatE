import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import {StorageServiceProvider} from '../../providers/storage-service/storage-service';
import {ChatPage} from '../chat/chat';
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  matches:any
  id: number = 0
  picture : string
  constructor(public navCtrl: NavController, private http : HttpClient, private storageService : StorageServiceProvider) {
    this.id = this.storageService.get("account_data").id
    this.picture = this.storageService.get("account_data").picture
  }
  ionViewDidEnter(){
    this.http.get("http://192.168.254.100/update/getmatchedusers/?id="+this.id).subscribe(res =>{
      this.matches = res
      console.log(res)
    },err =>{
    })
  }
  gotochat(id, username, other_avatar){
    this.navCtrl.push(ChatPage,{
      user_id: this.id,
      other_id: id,
      username : username,
      your_avatar : this.picture,
      other_avatar : other_avatar
    })
  }
}
