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
  constructor(public navCtrl: NavController, private http : HttpClient, private storageService : StorageServiceProvider) {

  }
  ionViewWillEnter(){
    console.log(this.preferences)
    this.current = 0
    this.id = this.storageService.get("account_data")[0].id
    this.preference = this.storageService.get("account_data")[0].preference
    this.http.get("http://192.168.254.100:80/update/getpreference/?id=" + this.id + "&pref=" + this.preference).subscribe(res => {
      console.log("Success!")
      this.preferences = res
    }, err => {
      console.log(err)
    })

  }
  like(){
    let body = {
      id: this.id,
      other_id : this.preferences[0][this.current].id,
      like : true
    }
    this.http.post("http://192.168.254.100:80/update/match/", body).subscribe(res => {
      console.log("Liked")
      this.current++
    }, err => {
      console.log("Check your internet connection ", err)
    })
  }
  dislike(){
    let body = {
      id : this.id,
      other_id : this.preferences[0][this.current].id,
      dislike : true
    }
    this.http.post("http://192.168.254.100:80/update/match/", body).subscribe( res => {
      console.log("Disliked")
      this.current++
    }, err => {
      console.log("Check your internet connection ", err)
    })
  }
}
