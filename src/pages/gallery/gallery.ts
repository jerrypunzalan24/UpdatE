import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { StorageServiceProvider } from '../../providers/storage-service/storage-service';
import { HostnameProvider } from '../../providers/hostname/hostname';
import { AlertController, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the GalleryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gallery',
  templateUrl: 'gallery.html',
})
export class GalleryPage {
  images: any = []
  addBtnDisabled: boolean = false
  userData: any = {}
  constructor(public navCtrl: NavController, public navParams: NavParams, public camera: Camera,
    private storageService: StorageServiceProvider, private h: HostnameProvider, private alertCtrl: AlertController,
    public toastController: ToastController,
    public http: HttpClient) {
    this.userData = this.storageService.get("account_data")
    this.getAllImage()
  }
  getAllImage() {
    this.http.get(this.h.getHostname() + "getuserpicture/" + this.storageService.get("account_data").account_id).subscribe(res => {
      this.images = res
      this.addBtnDisabled = this.images.length() >= 6
    }, err => {
      console.log("Error loading user photos ", err)
    })
  }
  prompt(gallery_id) {
    let imageOptions = this.alertCtrl.create({
      title: "Select an option",
      buttons: [
        {
          text: "Select image",
          handler: () => {
            const body = {
              id: this.storageService.get("account_data").account_id,
              gallery_id: gallery_id,
              submit: true
            }
            this.http.post(this.h.getHostname() + "selectpicture", body).subscribe(res => {
              this.displayToast("Image selected successfully")
              this.userData['picture'] = res['picture']
              this.storageService.set("account_data", this.userData)
              this.getAllImage()
            }, err => {
              console.log("Error ", err)
            })
          }
        },
        {
          text: "Delete Image",
          handler: () => {
            let decide = this.alertCtrl.create({
              title: "Are you sure?",
              buttons: [
                {
                  text: "Yes",
                  handler: () => {
                    if(this.storageService.get("account_id").gallery_id != gallery_id) {
                      const body = {
                        id: this.storageService.get("account_data").account_id,
                        gallery_id: gallery_id,
                        submit: true
                      }
                      this.http.post(this.h.getHostname() + "deletepicture", body).subscribe(res => {
                        this.displayToast("Image deleted successfully")
                        this.getAllImage()
                      }, err => {
                        console.log("Error ", err)
                      })
                    }
                    else{
                      this.displayToast("Error: Make sure this image is not set as your profile picture")
                    }
                  }
                },
                {
                  text: "No"
                }
              ]
            })
            decide.present()
          }
        }
      ]
    })
    imageOptions.present()
  }
  async displayToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    })
    toast.present()
  }
  addImage() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    }
    this.camera.getPicture(options).then((imageData) => {
      const body = {
        id: this.storageService.get("account_data").account_id,
        imageData: imageData,
        submit: true
      }
      this.http.post(this.h.getHostname() + "addpicture", body).subscribe(res => {
        console.log(res)
        this.getAllImage()
      }, err => {
        console.log("Error ", err)
      })
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad GalleryPage');
  }

}
