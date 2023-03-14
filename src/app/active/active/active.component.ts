import { Component } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { LoggerService } from 'src/app/login/logger.service';
import { TodoServiceService } from 'src/app/home/todo-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.less'],
})
export class ActiveComponent {
  items: Observable<Item[]>;
  item!: Item;

  constructor(
    private logger: LoggerService,
    private taskService: TodoServiceService
  ) {
    this.items = this.taskService.getTasks();
  }

  addItem(item: Item): void {
    this.taskService.setTask(item);
  }

  updateElement(item: Item): void {
    this.taskService.updateTask(item);
  }

  deleteElement(item: Item): void {
    this.taskService.deleteTask(item);
  }

  editElement(item: Item): void {
    this.item = item;
    this.taskService.deleteTask(item);
  }
}
