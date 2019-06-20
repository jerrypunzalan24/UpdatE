import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StorageServiceProvider } from '../../providers/storage-service/storage-service';
import { LoginPage } from '../login/login';
import { ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  userData = {}
  constructor(public navCtrl: NavController, private storageService: StorageServiceProvider, private http: HttpClient, public toastController: ToastController) {
    this.userData = {
        "id": this.storageService.get("account_data").id,
        "firstname": this.storageService.get("account_data").firstname,
        "age": this.storageService.get("account_data").age,
        "username": this.storageService.get("account_data").username,
        "picture": this.storageService.get("account_data").picture,
        "gender": this.storageService.get("account_data").gender,
        "preference": this.storageService.get("account_data").preference,
        "city": this.storageService.get("account_data").city,
        "about": this.storageService.get("account_data").about,
        "school": this.storageService.get("account_data").school
    }
  }
  editabout() {
    let body = {
      about: this.userData['about'],
      id: this.userData['id'],
      editabout: true
    }
    this.http.post("http://localhost/update/editabout/", body).subscribe(res => {
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
      id: this.userData['id'],
      editinfo: true,
    }
    this.http.post('http://localhost/update/edit/', body).subscribe(res => {
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
      id: this.storageService.get("account_data").id,
      submit: true
    }
    this.http.post("http://192.168.254.100:80/update/logout/", body).subscribe(res => {
      this.storageService.remove("account_data")
      this.navCtrl.setRoot(LoginPage)
      console.log("Success!")
    })
  }
}
