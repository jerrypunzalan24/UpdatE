import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the CProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CProvider {

  constructor(public http: HttpClient) {
    console.log('Hello CProvider Provider');
  }
  public static ENV = window['ENV'] || 'development';

  public static STORAGE_PREFIX_SEPARATOR = 'ಠ_ಠ';
  public static STORAGE_APP_PREFIX = 'yourawesomeapp';
  public static STORAGE_PREFIX = `${CProvider.STORAGE_APP_PREFIX}-${CProvider.ENV}${CProvider.STORAGE_PREFIX_SEPARATOR}`;
}
