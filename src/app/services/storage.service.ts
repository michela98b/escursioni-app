import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  private keyStorage = [];
  constructor() {

  }

  public setStorage(key:never, data:any) {
    this.keyStorage.push(key);
    localStorage.setItem(key, JSON.stringify(data));
  }

  public removeItem(key:any) {
    let index = this.keyStorage.findIndex(r => r === key);
    if (index !== -1) {
      this.keyStorage.splice(index, 1);
      localStorage.removeItem(key);
    }
  }

  public removeAllStorage() {
    this.keyStorage.forEach((val) => {
      localStorage.removeItem(val);
    });
    this.keyStorage = [];
  }

  public getStorageData(key:any) {
    return JSON.parse(localStorage.getItem(key)!);
  }

}
