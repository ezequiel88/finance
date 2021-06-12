import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LancamentoPage } from './lancamento.page';

const routes: Routes = [
  {
    path: '',
    component: LancamentoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LancamentoPageRoutingModule {}
