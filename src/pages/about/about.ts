import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import {StorageServiceProvider} from '../../providers/storage-service/storage-service';
import {HostnameProvider} from '../../providers/hostname/hostname';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  preferences:any = {}
  id: number
  current: number = 0
  preference: number

  geoLatitude: number;
  geoLongitude: number;
  geoAccuracy:number;
  geoAddress: string;
 
  watchLocationUpdates:any; 
  loading:any;
  isWatching:boolean;

  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };
  constructor(public navCtrl: NavController, private http : HttpClient, private storageService : StorageServiceProvider
    , private geolocation : Geolocation, private nativeGeocoder: NativeGeocoder, public h : HostnameProvider) {

      this.geolocation.getCurrentPosition().then((resp)=>{
        this.geoLatitude = resp.coords.latitude;
        this.geoLongitude = resp.coords.longitude;
        this.geoAccuracy = resp.coords.accuracy;
        this.nativeGeocoder.reverseGeocode(this.geoLatitude, this.geoLongitude, this.geoencoderOptions)
        .then((result : NativeGeocoderReverseResult[])=>{
          this.geoAddress = this.generateAddress(result[0])
          console.log(this.geoAddress);
          let body = {
            id : this.storageService.get("account_id").account_id,
            address : this.geoAddress,
            submit: true
          }
          this.http.post(this.h.getHostname() + "updatelocation", body).subscribe(res=>{
            console.log(res)
          },err => {
            console.log("Error: ", err)
          })
        }).catch(error=>{
          console.log("Error getting location", JSON.stringify(error))
        })
      }).catch(error=>{
        console.log("Error getting location", JSON.stringify(error))
      })
  }
  generateAddress(addressObj){
    let obj = [];
    let address = "";
    for (let key in addressObj) {
      obj.push(addressObj[key]);
    }
    obj.reverse();
    for (let val in obj) {
      if(obj[val].length)
      address += obj[val]+', ';
    }
  return address.slice(0, -2);
}
  ionViewWillEnter(){
    console.log(this.preferences)
    this.current = 0
    this.id = this.storageService.get("account_data").id
    this.preference = this.storageService.get("account_data").preference
    this.http.get(this.h.hostname + "getpreference/" + this.id + "/" + this.preference).subscribe(res => {
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
    this.http.post(this.h.hostname + "match", body).subscribe(res => {
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
    this.http.post(this.h.hostname + "match", body).subscribe( res => {
      console.log("Disliked")
      this.current++
    }, err => {
      console.log("Check your internet connection ", err)
    })
  }
}
