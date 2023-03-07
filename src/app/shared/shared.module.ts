import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './todo/todo.component';
import { TaskColorDirective } from './task-color.directive';

@NgModule({
  declarations: [TodoComponent, TaskColorDirective],
  imports: [CommonModule],
  exports: [TodoComponent, TaskColorDirective],
})
export class SharedModule {}
