import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { Priority } from 'src/app/models/priority.model';
import { orderBy } from 'lodash';

@Component({
  selector: 'app-active-list',
  templateUrl: './active-list.component.html',
  styleUrls: ['./active-list.component.less'],
})
export class ActiveListComponent {
  itemLow: Item[] = [];
  itemMedium: Item[] = [];
  itemHigh: Item[] = [];
  completed: Item[] = [];

  @Input() set arr(arr: Item[] | null) {
    if (arr) {
      this.itemLow = arr.filter(
        (val) => val.priority === Priority.low && !val.completed
      );
      this.itemMedium = arr.filter(
        (val) => val.priority === Priority.medium && !val.completed
      );
      this.itemHigh = arr.filter(
        (val) => val.priority === Priority.high && !val.completed
      );
      this.completed = arr.filter((val) => val.completed);
    }
  }
  @Output() updateElement: EventEmitter<Item> = new EventEmitter();
  @Output() deleteElement: EventEmitter<Item> = new EventEmitter();
  @Output() editElement: EventEmitter<Item> = new EventEmitter();

  onItemDrop(item: any, priority: Priority) {
    this.changePriority(item.dragData, priority);
  }

  changePriority(el: Item, p: Priority) {
    el.priority = p;
    this.updateElement.emit(el);
  }

  get Priority() {
    return Priority;
  }

  handleComplete(item: Item) {
    item.completed = true;
    this.updateElement.emit(item);
  }

  handleDelete(item: Item) {
    this.deleteElement.emit(item);
  }

  handleEdit(item: Item) {
    this.editElement.emit(item);
  }

  filter(arr: Item[], filterBy: string) {
    return orderBy(arr, filterBy);
  }
}
