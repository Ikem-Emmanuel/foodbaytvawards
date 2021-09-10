import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BatchComponent } from '../batch/batch.component';

const routes: Routes = [
  {
    path: '',
    component: BatchComponent,
    data: { title: 'Batch', titleI18n: 'menu.batch' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BatchRoutingModule {}
