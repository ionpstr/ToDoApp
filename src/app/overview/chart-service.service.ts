import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { TodoServiceService } from '../home/todo-service.service';
import { Item } from '../models/item.model';
@Injectable({
  providedIn: 'root',
})
export class ChartServiceService {
  items: Item[] = [];
  sub: Subscription;
  constructor(taskService: TodoServiceService) {
    this.sub = taskService.getTasks().subscribe((val) => (this.items = val));
  }

  getPieGridData() {
    const month = new Date();
    let activeTasks = 0;
    let completedTasks = 0;
    for (let item of this.items) {
      if (item.date != null) {
        item.date = new Date(item.date);
      }

      if (month.getMonth() === item.date?.getMonth()) {
        if (item.completed) {
          ++completedTasks;
        } else {
          ++activeTasks;
        }
      }
    }
    return [
      {
        name: 'Completed Tasks',
        value: completedTasks,
      },
      {
        name: 'Remaining Tasks',
        value: activeTasks,
      },
    ];
  }

  getBarHorData() {
    const month = new Date();

    let activeTasks = 0;
    let completedTasks = 0;
    for (let item of this.items) {
      if (month.getMonth() === item.date?.getMonth()) {
        if (item.completed) {
          ++completedTasks;
        } else {
          ++activeTasks;
        }
      }
    }
    return [
      {
        name: '',
        series: [
          {
            name: 'Done',
            value: completedTasks,
          },
          {
            name: 'Not Done',
            value: activeTasks,
          },
        ],
      },
    ];
  }

  getTimeData() {
    const month = new Date();
    let hours = 0;
    let days = 0;
    let h = 0;
    let m = 0;
    let daysMap = new Map();
    for (let item of this.items) {
      if (item.date != null) {
        const date = new Date(item.date);
        if (date.getMonth() === month.getMonth()) {
          daysMap.set(date.getDate(), 0);

          if (item.to && item.from) {
            h = item.to.hour - item.from.hour;
            m = item.to.minute - item.from.minute;
            hours += h + m * 0.01666667;
          }
        }
      }
    }

    days =
      new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate() -
      daysMap.size;
    return [
      {
        name: 'Days without tasks',
        value: days,
      },
      {
        name: 'Total number of hours',
        value: hours.toFixed(2),
      },
    ];
  }

  onDestroy() {
    this.sub.unsubscribe();
  }
}
