import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgDragDropModule } from 'ng-drag-drop';
import { ActiveRoutingModule } from './active-routing.module';
import { ActiveComponent } from './active/active.component';
import { SharedModule } from '../shared/shared.module';
import { ActiveListComponent } from './active/active-list/active-list.component';
import { ActiveInputComponent } from './active/active-input/active-input.component';
import {
  NgbTimepickerModule,
  NgbDatepickerModule,
  NgbDropdownModule,
} from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [ActiveComponent, ActiveListComponent, ActiveInputComponent],
  imports: [
    CommonModule,
    ActiveRoutingModule,
    SharedModule,
    NgDragDropModule.forRoot(),
    NgbTimepickerModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    NgbDatepickerModule,
  ],
})
export class ActiveModule {}
