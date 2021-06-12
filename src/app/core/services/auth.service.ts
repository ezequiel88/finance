import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Login } from '../models/Login.models';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: BehaviorSubject<Observable<firebase.default.User>> = new BehaviorSubject<Observable<firebase.default.User>>(null);
  public user$ = this.user.asObservable().pipe(switchMap((user: Observable<firebase.default.User>) => user));

  constructor(private afa: AngularFireAuth, private router: Router) {

    this.user.next(this.afa.authState)
    this.afa.onAuthStateChanged((user: firebase.default.User) => {
      if (!user) {
       this.router.navigate(['/'])
      } 
    })
  }

  login(login: Login): Observable<firebase.default.auth.UserCredential> {
    return from(this.afa.signInWithEmailAndPassword(login.email, login.senha));
  }

  register(login: Login): Observable<firebase.default.auth.UserCredential> {
    return from(this.afa.createUserWithEmailAndPassword(login.email, login.senha));
  }

  rePassword(email: string): Observable<any> {
    return from(this.afa.sendPasswordResetEmail(email));
  }

  logout(): Observable<void> {
    return from(this.afa.signOut());
  }
}