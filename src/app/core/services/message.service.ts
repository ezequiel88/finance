import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
  })
export class MessageService {

    private loading;

    constructor(
        private toastCtrl: ToastController,
        private loadCtrl: LoadingController
    ) { }

    async showLoading() {
        if (!this.loading) {
            this.loading = await this.loadCtrl.create({
                message: `
              <div class="custom-spinner-container">
                <div class="custom-spinner-box">
                <p>Carregando ...</p>
                </div>
              </div>`
            });
            return this.loading.present();
        }
    }

    dismissLoading() {
        if (this.loading) {
            this.loading.dismiss();
            this.loading = null;
        }
    }

    async toastMsg(msg: string) {
        let toast = await this.toastCtrl.create({
            message: msg,
            duration: 2000,
            position: 'bottom',
            color: 'dark'
        });
        return toast.present();
    }
}