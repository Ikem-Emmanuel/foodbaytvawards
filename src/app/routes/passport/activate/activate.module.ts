import { ActivateComponent } from './activate.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivateRoutingModule } from './activate-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SHARED_ZORRO_MODULES } from 'src/app/shared/shared-zorro.module';

@NgModule({
  declarations: [ActivateComponent],
  imports: [CommonModule, ActivateRoutingModule, FormsModule, ReactiveFormsModule, TranslateModule, ...SHARED_ZORRO_MODULES],
})
export class ActivateModule {}
