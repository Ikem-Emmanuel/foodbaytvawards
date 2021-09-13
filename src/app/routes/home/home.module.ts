import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HeroComponent } from './components/hero/hero.component';
import { HeaderComponent } from './components/header/header.component';
import { AboutComponent } from './components/about/about.component';
import { GudelinesComponent } from './components/gudelines/gudelines.component';
import { JudgesComponent } from './components/judges/judges.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { SharedModule } from '@shared';
import { SHARED_ZORRO_MODULES } from 'src/app/shared/shared-zorro.module';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    HeroComponent,
    AboutComponent,
    GudelinesComponent,
    JudgesComponent,
    ContactComponent,
    FooterComponent,
  ],
  imports: [CommonModule, HomeRoutingModule, ...SHARED_ZORRO_MODULES, SharedModule],
})
export class HomeModule {}
