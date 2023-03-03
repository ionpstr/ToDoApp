import { Component } from '@angular/core';
import { TodoServiceService } from 'src/app/home/todo-service.service';
import { Item } from 'src/app/models/item.model';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.less'],
})
export class ActiveComponent {
  todoItem: Item = {
    id: 0,
    todo: 'Play csgo tonight with friends',
    completed: false,
    userId: 1,
    date: new Date(),
    priority: 1,
    time: new Date('December 17, 2024 03:24:00'),
  };

  items: Observable<Item[]>;

  constructor(private todoService: TodoServiceService) {
    this.items = this.todoService
      .getAllTodos()
      .pipe(tap((item) => console.log(item)));
  }
}
