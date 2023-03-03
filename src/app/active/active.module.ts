import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgDragDropModule } from 'ng-drag-drop';
import { ActiveRoutingModule } from './active-routing.module';
import { ActiveComponent } from './active/active.component';
import { SharedModule } from '../shared/shared.module';
import { ActiveListComponent } from './active/active-list/active-list.component';

@NgModule({
  declarations: [ActiveComponent, ActiveListComponent],
  imports: [
    CommonModule,
    ActiveRoutingModule,
    SharedModule,
    NgDragDropModule.forRoot(),
  ],
})
export class ActiveModule {}
