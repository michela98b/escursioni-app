import { Injectable } from "@angular/core";
import { StorageService } from "./storage.service";

@Injectable()
export class UserStorageService {
  private token: any;
  private user:any;
  private role:any;
  private current_activity:any;

  constructor(private storage: StorageService) {
    this.token = JSON.parse(localStorage.getItem('token')!);
    this.user = JSON.parse(localStorage.getItem('user')!);
    this.role = JSON.parse(localStorage.getItem('role')!);
    this.current_activity = JSON.parse(localStorage.getItem('current_activity')!);
  }

  public setToken(value:String) {
    this.token = value;
    localStorage.setItem('token', JSON.stringify(this.token));
  }

  public setCurrentActivity(value:any) {
    this.current_activity = value;
    localStorage.setItem('current_activity', JSON.stringify(this.current_activity));
  }

  public setRole(value:String) {
    this.role = value;
    localStorage.setItem('role', JSON.stringify(this.role));
  }

  public setUser(value:any) {
    this.user = value;
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  public getToken(): any {
    return this.token;
  }
  public getCurrentActivity(): any {
    return this.current_activity;
  }

  public getRole(): any {
    return this.role;
  }

  public getUser(): any {
    return this.user;
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    localStorage.removeItem('current_activity');
    this.token = null;
    this.user = null;
    this.role = null;
    this.current_activity = null;
    this.storage.removeAllStorage();
    localStorage.clear();
  }
}
