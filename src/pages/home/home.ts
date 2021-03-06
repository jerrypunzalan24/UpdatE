import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { StorageServiceProvider } from '../../providers/storage-service/storage-service';
import { LoginPage } from '../login/login';
import { ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import {Camera, CameraOptions} from '@ionic-native/camera';
import {GalleryPage} from '../gallery/gallery';
import {HostnameProvider} from '../../providers/hostname/hostname';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  userData = {}
  myphoto = ''
  constructor(public app : App, public navCtrl: NavController, private storageService: StorageServiceProvider, private http: HttpClient, public toastController: ToastController, public camera : Camera,
    public h : HostnameProvider) {
    // this.userData = {
    //     "id": this.storageService.get("account_data").id,
    //     "firstname": this.storageService.get("account_data").firstname,
    //     "age": this.storageService.get("account_data").age,
    //     "username": this.storageService.get("account_data").username,
    //     "picture": this.storageService.get("account_data").picture,
    //     "gender": this.storageService.get("account_data").gender,
    //     "preference": this.storageService.get("account_data").preference,
    //     "city": this.storageService.get("account_data").city,
    //     "about": this.storageService.get("account_data").about,
    //     "school": this.storageService.get("account_data").school
    // }
    this.userData = this.storageService.get("account_data")
    console.log(this.userData)
    this.myphoto = this.userData['picture']
  }
  // setProfilepic(){
  //   const options : CameraOptions = {
  //     quality : 70,
  //     destinationType : this.camera.DestinationType.DATA_URL,
  //     sourceType : this.camera.PictureSourceType.PHOTOLIBRARY,
  //     saveToPhotoAlbum : false
  //   }
  //   this.camera.getPicture(options).then((imageData) => {
  //     this.myphoto =  imageData
  //   })
  // }
  gotoGallery(){
    this.navCtrl.push(GalleryPage)
  }
  // updateProfilepic(){
  //   const body = {
  //     photo : this.myphoto,
  //     id : this.userData['account_id'],
  //     submit : true,
  //   }
  //   this.http.post(this.h.hostname + "changeprofilepic", body).subscribe(res =>{
  //     this.displayToast("Success!")
  //     this.isdisabled = true
  //     console.log(res)
  //   }, err =>{
  //     console.log(err)
  //   })
  // }
  editabout() {
    let body = {
      about: this.userData['about'],
      id: this.userData['account_id'],
      editabout: true
    }
    this.http.post(this.h.hostname + "editabout", body).subscribe(res => {
      this.userData['about'] = body.about
      this.storageService.set("account_data", this.userData)
      this.displayToast("Edit success!")
    }, err => {
      this.displayToast("Edit info failed maybe check your internet connection")
      console.log(err)
    })
  }
  editinfo() {
    let body = {
      firstname: this.userData['firstname'],
      age: this.userData['age'],
      city: this.userData['city'],
      school: this.userData['school'],
      id: this.userData['account_id'],
      editinfo: true,
    }
    this.http.post(this.h.hostname + 'edit', body).subscribe(res => {
      this.userData['firstname'] = body.firstname
      this.userData['age'] = body.age
      this.userData['school'] = body.school
      this.userData['city'] = body.city
      this.storageService.set("account_data", this.userData)
      this.displayToast("Edit success!")
    }, err => {
      this.displayToast("Edit failed maybe check your internet connection")
      console.log(err)
    })
  }
  async displayToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    })
    toast.present()
  }
  logout() {
    let body = {
      id: this.storageService.get("account_data").account_id,
      submit: true
    }
    this.http.post(this.h.hostname + "logout", body).subscribe(res => {
      this.storageService.remove("account_data")
      console.log(res)
      this.app.getRootNav().setRoot(LoginPage);
      console.log("Success!")
    })
  }
}
