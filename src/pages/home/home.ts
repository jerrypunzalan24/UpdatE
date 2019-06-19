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
      0: {
        "id": this.storageService.get("account_data")[0].id,
        "firstname": this.storageService.get("account_data")[0].firstname,
        "age": this.storageService.get("account_data")[0].age,
        "username": this.storageService.get("account_data")[0].username,
        "picture": this.storageService.get("account_data")[0].picture,
        "gender": this.storageService.get("account_data")[0].gender,
        "preference": this.storageService.get("account_data")[0].preference,
        "city": this.storageService.get("account_data")[0].city,
        "about": this.storageService.get("account_data")[0].about,
        "school": this.storageService.get("account_data")[0].school
      }
    }
  }
  editabout() {
    let body = {
      about: this.userData[0].about,
      id: this.userData[0].id,
      editabout: true
    }
    this.http.post("http://localhost/update/editabout/", body).subscribe(res => {
      this.userData[0].about = body.about
      this.storageService.set("account_data", this.userData)
      this.displayToast("Edit success!")
    }, err => {
      this.displayToast("Edit info failed maybe check your internet connection")
      console.log(err)
    })
  }
  editinfo() {
    let body = {
      firstname: this.userData[0].firstname,
      age: this.userData[0].age,
      city: this.userData[0].city,
      school: this.userData[0].school,
      id: this.userData[0].id,
      editinfo: true,
    }
    this.http.post('http://localhost/update/edit/', body).subscribe(res => {
      this.userData[0].firstname = body.firstname
      this.userData[0].age = body.age
      this.userData[0].school = body.school
      this.userData[0].city = body.city
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
      id: this.storageService.get("account_data")[0].id,
      submit: true
    }
    this.http.post("http://192.168.254.100:80/update/logout/", body).subscribe(res => {
      this.storageService.remove("account_data")
      this.navCtrl.setRoot(LoginPage)
      console.log("Success!")
    })
  }
}
