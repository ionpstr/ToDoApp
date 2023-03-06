import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from 'src/app/models/item.model';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.less'],
})
export class TodoComponent {
  @Input() todo!: Item;
  @Output() onComplete: EventEmitter<void> = new EventEmitter();
  @Output() onEdit: EventEmitter<void> = new EventEmitter();
  @Output() onDelete: EventEmitter<void> = new EventEmitter();
  completeTask() {
    this.onComplete.emit();
  }
  editTask() {
    this.onEdit.emit();
  }
  deleteTask() {
    this.onDelete.emit();
  }
}
