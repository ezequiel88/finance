import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, Router } from '@angular/router';
import { take, switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class NoAuthGuard implements CanActivate {

    constructor(private afa: AngularFireAuth, private router: Router) { }

    canActivate() {
        return this.afa.authState.pipe(
            take(1),
            switchMap(async (authState) => {
                if (authState) {
                    return false
                } else {
                    return true
                }
            }),
        )
    }
}