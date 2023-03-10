import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { TodoServiceService } from '../home/todo-service.service';
import { Item } from '../models/item.model';
@Injectable({
  providedIn: 'root',
})
export class ChartServiceService {
  gridData: Observable<any>;
  pieData: Observable<any>;
  timeData: Observable<any>;
  constructor(taskService: TodoServiceService) {
    this.gridData = taskService
      .getTasks()
      .pipe(map((val) => this.getPieGridData(val)));
    this.pieData = taskService
      .getTasks()
      .pipe(map((val) => this.getBarHorData(val)));
    this.timeData = taskService
      .getTasks()
      .pipe(map((val) => this.getTimeData(val)));
  }

  getPieGridData(items: Item[]) {
    const month = new Date();
    let activeTasks = 0;
    let completedTasks = 0;
    for (let item of items) {
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

  getBarHorData(items: Item[]) {
    const month = new Date();

    let activeTasks = 0;
    let completedTasks = 0;
    for (let item of items) {
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

  getTimeData(items: Item[]) {
    const month = new Date();
    let hours = 0;
    let days = 0;
    let h = 0;
    let m = 0;
    let daysMap = new Map();
    for (let item of items) {
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
}
