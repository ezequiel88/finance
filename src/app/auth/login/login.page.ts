import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { take, catchError } from 'rxjs/operators';
import { Login } from 'src/app/core/models/Login.models';
import { AuthService } from 'src/app/core/services/auth.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  loginForm: FormGroup;
  errorMsg: string;

  constructor(private frmBuilder: FormBuilder, private auth: AuthService, private router: Router, private msg: MessageService) {

    this.loginForm = this.frmBuilder.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      senha: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    })

  }

 login(login: Login) {
    this.auth.login(login)
    .pipe(
      take(1),
      catchError((error) => {     
        console.log(error)
        if (error.code === 'auth/user-not-found') {
         this.msg.toastMsg('Usuário não encontrado!');
        } else if (error.code === 'auth/wrong-password'){
          this.msg.toastMsg('Senha incorreta!');
        } else {
          this.msg.toastMsg('Erro ao recuperar suas credenciais!');
        }
        return EMPTY;
      }),
    )
    .subscribe(
      (response) => {
        this.loginForm.reset()
        this.router.navigate(['/'])       
      }
    )
  }


}