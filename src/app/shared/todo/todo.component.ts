import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from 'src/app/models/item.model';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.less'],
})
export class TodoComponent {
  @Input() todo!: Item;
  @Output() Complete: EventEmitter<void> = new EventEmitter();
  @Output() Edit: EventEmitter<void> = new EventEmitter();
  @Output() Delete: EventEmitter<void> = new EventEmitter();
  completeTask() {
    this.Complete.emit();
  }
  editTask() {
    this.Edit.emit();
  }
  deleteTask() {
    this.Delete.emit();
  }
}
