import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { TodoServiceService } from './todo-service.service';
import { ChartServiceService } from '../overview/chart-service.service';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule],
  providers: [TodoServiceService, ChartServiceService],
})
export class HomeModule {}
