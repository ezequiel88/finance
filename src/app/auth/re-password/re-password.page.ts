import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { take, catchError } from 'rxjs/operators';
import { Login } from 'src/app/core/models/Login.models';
import { AuthService } from 'src/app/core/services/auth.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-re-password',
  templateUrl: './re-password.page.html',
  styleUrls: ['./re-password.page.scss'],
})
export class RePasswordPage {

  formReSenha: FormGroup;
  errorMsg: string;

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router, private msg: MessageService) {
    this.formReSenha = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])]
    })

  }

  reSenha(user: Login) {
    if (this.formReSenha.valid) {
      this.auth.rePassword(user.email)
        .pipe(
          take(1),
          catchError((error) => {
            this.msg.toastMsg('Erro ao processar sua solicitação!')
            return EMPTY;
          }),
        )
        .subscribe(
          (response) => {
            this.formReSenha.reset()
            this.msg.toastMsg('Verifique seu email para redefinir sua senha!')
            this.router.navigate(['/'])
          }
        )
    }

  }
}