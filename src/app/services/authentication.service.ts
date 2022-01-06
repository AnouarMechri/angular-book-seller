import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {BehaviorSubject, Observable} from "rxjs";
import {user} from "../models/user.model";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

const API_URL = `${environment.BASE_URL}/api/authentication/`

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public currentUser: Observable<user>;
  private currentUserSubject: BehaviorSubject<user>;

  constructor(private http: HttpClient) {
    let storageUser;
    const storageUserAsStr = localStorage.getItem('currentUser');
    if (storageUserAsStr) {
      storageUser = JSON.parse(storageUserAsStr);
    }

    this.currentUserSubject = new BehaviorSubject<user>(storageUser);
    this.currentUser = this.currentUserSubject.asObservable();

  }
  public get currentUserValue(): user {
    return this.currentUserSubject.value;
}
login(user: user): Observable<any> {
  return this.http.post<any>(API_URL + 'sign-in', user).pipe(
    map(response => {
      if (response) {
        localStorage.setItem('currentUser', JSON.stringify(response));
        this.currentUserSubject.next(response);
      }
      return response;
    })
  );
}

register(user: user): Observable<any> {
  return this.http.post(API_URL + 'sign-up', user);
}

logOut() {
  localStorage.removeItem('currentUser');
  this.currentUserSubject.next(new user);
}

}