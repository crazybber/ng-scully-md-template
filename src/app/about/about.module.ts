import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ScullyLibModule} from '@scullyio/ng-lib';
import {AboutRoutingModule} from './about-routing.module';
import {AboutComponent} from './about.component';

@NgModule({
  declarations: [AboutComponent],
  imports: [CommonModule, AboutRoutingModule, ScullyLibModule],
})
export class AboutModule {}
