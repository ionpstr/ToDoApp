import { Component } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { LoggerService } from 'src/app/login/logger.service';

@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.less'],
})
export class ActiveComponent {
  items: Item[] = [];
  item: Item | null = null;

  constructor(private logger: LoggerService) {}

  addItem(item: Item) {
    const i = new Item({
      todo: item.todo,
      from: item.from,
      to: item.to,
      date: item.date,
      priority: item.priority,
      userId: this.logger.getUser.id,
      createdAt: new Date(),
      completed: false,
    });
    this.items = [...this.items, i];
    console.log(this.items);
  }

  updateElement(item: Item) {
    this.items[this.items.indexOf(item)] = item;
    this.items = [...this.items.filter((item) => !item.priority)];
  }

  deleteElement(item: Item) {
    this.items = [
      ...this.items.slice(0, this.items.indexOf(item)),
      ...this.items.slice(this.items.indexOf(item) + 1),
    ];
  }

  editElement(item: Item) {
    this.item = item;
    this.deleteElement(item);
  }
}
