import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private itemExist(key: string) {
    return localStorage.getItem(key) !== null
  }

  private getItem(key: string) {
    return localStorage.getItem(key)
  }


  addToStorage(key: string, value: any): void {

    if(! this.itemExist(key)) {

      if(typeof value === "string") {
        localStorage.setItem(key, value)
      }

      if(typeof value !== "string") {
        const jsonValue = JSON.stringify(value)
        localStorage.setItem(key, jsonValue)
      }

    }
  }

  getFromStroage<T>(key: string): T | string | null {

    let item = this.getItem(key)

    if(typeof item === "string") {
      return item
    }

    if(typeof item !== "string" && item != null) {
      console.log("item", item)
      return JSON.parse(item) as T
    }

    return null;

  }

  removeFromStorage(key: string): void {

    if(this.itemExist(key)) {
      localStorage.removeItem(key)
    }
  }

  isAuthenticated() {
    return this.getItem("guest_token") !== null;
  }

  constructor() { }


}
