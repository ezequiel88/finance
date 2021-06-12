import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LancamentoPageRoutingModule } from './lancamento-routing.module';

import { LancamentoPage } from './lancamento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LancamentoPageRoutingModule
  ],
  declarations: [LancamentoPage]
})
export class LancamentoPageModule {}
