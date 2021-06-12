import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RePasswordPage } from './re-password.page';

const routes: Routes = [
  {
    path: '',
    component: RePasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RePasswordPageRoutingModule {}
