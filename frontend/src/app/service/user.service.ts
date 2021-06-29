import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[]
  _url = 'http://localhost:5000/users/'
  constructor(private http: HttpClient) { }

  getPlayerName() {
    return this.http.get<any>(this._url)
  }
  postPlayerName(user: User) {
    return this.http.post<any>(this._url, user)
  }
}
