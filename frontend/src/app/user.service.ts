import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  rootURL = 'http://localhost:3080';

  getUsers() {
    return this.http.get(this.rootURL);
  }

  addUser(user: any) {
    return this.http.post(this.rootURL, { user });
  }

  // rootURL = '/api';

  // getUsers() {
  //   return this.http.get(this.rootURL + '/users');
  // }

  // addUser(user: any) {
  //   return this.http.post(this.rootURL + '/user', { user });
  // }

}
