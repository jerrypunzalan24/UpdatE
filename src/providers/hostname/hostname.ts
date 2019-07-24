import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the HostnameProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HostnameProvider {
  // hostname: string = "http://updateaws-env.pvfiwbdpgp.us-east-2.elasticbeanstalk.com/"
  hostname : String = "http://192.168.8.100/update-aws/public/";
  constructor(public http: HttpClient) {
    console.log('Hello HostnameProvider Provider');
  }
  getHostname(): String{
    return this.hostname
  }

}
