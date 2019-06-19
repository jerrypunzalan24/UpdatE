
import { Injectable } from '@angular/core';

import {CProvider} from '../c/c'; 

/*
  Generated class for the StorageServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageServiceProvider {
  private storage: any
  constructor() {
    this.storage = localStorage
  }
  public set(key: string, value: any) {
    switch (typeof value) {
      case 'function':
        throw new Error('Yeah, so, functions cannot be saved into localStorage.');
      case 'string':
      case 'number':
      case 'boolean':
      case 'undefined':
        this.storage.setItem(CProvider.STORAGE_PREFIX + key, value || '');
        break;
      default:
        this.storage.setItem(CProvider.STORAGE_PREFIX + key, JSON.stringify(value));
        break;
    }
  }
  public get(key: string, defaultValue?: any) {
    let item = this.storage.getItem(CProvider.STORAGE_PREFIX + key) || defaultValue;

    // We do not need to parse the default value
    if (item !== defaultValue) {
      try {
        item = JSON.parse(item || '{}'); // TODO Why an empty object, does that make sense?
      } catch (e) {
        // Item is probably a string like 'Hello world' which cannot be parsed,
        // no hard feelings, just don't let the app crash
      }
    }

    return item;
  }
  public remove(key: string) {
    this.storage.removeItem(CProvider.STORAGE_PREFIX + key);
  }
}
