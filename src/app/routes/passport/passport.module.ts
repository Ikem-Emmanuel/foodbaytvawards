import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { PassportRoutingModule } from './passport-routing.module';
import { ActivateComponent } from './activate/activate.component';

@NgModule({
  imports: [SharedModule, PassportRoutingModule],
  declarations: [],
})
export class PassportModule {}
