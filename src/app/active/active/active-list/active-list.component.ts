import { Component, Input } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { Priority } from 'src/app/models/priority.model';

@Component({
  selector: 'app-active-list',
  templateUrl: './active-list.component.html',
  styleUrls: ['./active-list.component.less'],
})
export class ActiveListComponent {
  itemLow: Item[] = [];
  itemMedium: Item[] = [];
  itemHigh: Item[] = [];

  @Input() arr: Item[] = [];

  onItemDrop(item: any, priority: Priority) {
    this.changePriority(item.dragData, priority);
    this.itemLow = this.arr.filter((val) => val.priority === 1).slice();
    this.itemMedium = this.arr.filter((val) => val.priority === 2).slice();
    this.itemHigh = this.arr.filter((val) => val.priority === 3).slice();
  }

  changePriority(el: Item, p: Priority) {
    el.priority = p;
  }

  ngOnInit() {
    this.itemLow = this.arr.filter((val) => val.priority === 1).slice();
    this.itemMedium = this.arr.filter((val) => val.priority === 2).slice();
    this.itemHigh = this.arr.filter((val) => val.priority === 3).slice();
  }
}
