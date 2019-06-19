import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import {StorageServiceProvider} from '../../providers/storage-service/storage-service';
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  matches = {}
  constructor(public navCtrl: NavController, private http : HttpClient, private storageService : StorageServiceProvider) {
    
  }
  ionViewWillEnter(){
    this.http.get("http://192.168.254.100/update/getmatchedusers").subscribe(res =>{
      this.matches = res
      console.log(res)
    },err =>{

    })
  }
}
