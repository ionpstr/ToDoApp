import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview/overview.component';
import { OverviewRoutingModule } from './overview-routing.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
@NgModule({
  declarations: [OverviewComponent],
  imports: [CommonModule, OverviewRoutingModule, NgxChartsModule],
})
export class OverviewModule {}
