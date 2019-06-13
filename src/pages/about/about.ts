import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  opacity = 1
  images = ["doge1.jpg"]
  constructor(public navCtrl: NavController) {

  }
  
  iondrag($event, i){
    let percent = $event.getSlidingPercent()
    console.log(percent)
    if(percent > 2){
      console.log('Right!!!!' + i)

      this.images.shift()
      console.table(this.images)
    }
    else if(percent < -2){
      console.log('Left!!!' + i)
      
    this.images.shift()
    console.table(this.images)
    }
  }
}
