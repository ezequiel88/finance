import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { EMPTY } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { AuthService } from './core/services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  public appPages = [
    { title: 'Dashboard', url: '/dashboard', icon: 'pie-chart' },
    { title: 'Lançamentos', url: '/lancamento', icon: 'wallet' },
    { title: 'Categorias', url: '/categoria', icon: 'archive' },
  ];

  constructor(public auth: AuthService, private alertCtrl: AlertController, private router: Router) {}

  async logout() {

    const confirm = await this.alertCtrl.create({
      header: 'Finance',
      subHeader: 'Deseja sair da aplicação?',

      buttons: [
        { text: 'Cancelar', handler: () => { } },
        {
          text: 'Sair',
          handler: (() => {
            this._logout();
          })
        }
      ]
    });
    confirm.present();
  }

  _logout() {
    this.auth.logout()
      .pipe(
        take(1),
        catchError((error) => {
          console.log(error)
          return EMPTY;
        }),
      )
      .subscribe((res) => {         
            this.router.navigate(['/'])       
        }
      )
  }
}
