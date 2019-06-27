import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import {StorageServiceProvider} from '../../providers/storage-service/storage-service';
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  preferences:any = {}
  id: number
  current: number = 0
  preference: number
  hostname : String = "http://updateaws-env.pvfiwbdpgp.us-east-2.elasticbeanstalk.com/";
  constructor(public navCtrl: NavController, private http : HttpClient, private storageService : StorageServiceProvider) {

  }
  ionViewWillEnter(){
    console.log(this.preferences)
    this.current = 0
    this.id = this.storageService.get("account_data").id
    this.preference = this.storageService.get("account_data").preference
    this.http.get(this.hostname + "getpreference/" + this.id + "/" + this.preference).subscribe(res => {
      console.log("Success!")
      this.preferences = res
    }, err => {
      console.log(err)
    })

  }
  like(){
    let body = {
      id: this.id,
      other_id : this.preferences[this.current].id,
      like : true
    }
    this.http.post(this.hostname + "match", body).subscribe(res => {
      console.log("Liked")
      this.current++
    }, err => {
      console.log("Check your internet connection ", err)
    })
  }
  dislike(){
    let body = {
      id : this.id,
      other_id : this.preferences[this.current].id,
      dislike : true
    }
    this.http.post(this.hostname + "match", body).subscribe( res => {
      console.log("Disliked")
      this.current++
    }, err => {
      console.log("Check your internet connection ", err)
    })
  }
}
