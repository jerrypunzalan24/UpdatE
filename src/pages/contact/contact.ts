import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import {StorageServiceProvider} from '../../providers/storage-service/storage-service';
import {ChatPage} from '../chat/chat';
import {HostnameProvider} from '../../providers/hostname/hostname';
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  matches:any
  id: number = 0
  picture : string
  constructor(public navCtrl: NavController, private http : HttpClient, private storageService : StorageServiceProvider,
    public h : HostnameProvider) {
    this.id = this.storageService.get("account_data").account_id
    this.picture = this.storageService.get("account_data").picture
  }
  ionViewDidEnter(){
    this.http.get(this.h.hostname + "getmatchedusers/"+this.id).subscribe(res =>{
      this.matches = res
      console.log(res)
    },err =>{
      console.log(err.error)
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
