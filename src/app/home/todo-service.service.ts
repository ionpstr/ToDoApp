import { Injectable } from '@angular/core';
import { LoggerService } from '../login/logger.service';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Item } from '../models/item.model';
@Injectable()
export class TodoServiceService {
  private dataStore: Item[] = [];

  constructor(private logger: LoggerService) {
    this.logger.userIsAtuth().subscribe((user) => {
      if (user.username == null) {
        this.itemsSubject.complete();
      }
    });
    this.items = this.itemsSubject.asObservable();
    this.dataStore = [
      ...this.dataStore,
      ...(JSON.parse(localStorage.getItem('items') as string) || []),
    ];
    this.itemsSubject.next(this.dataStore);
  }

  items: Observable<Item[]>;
  private itemsSubject: Subject<Item[]> = new BehaviorSubject(this.dataStore);

  setTask(item: Item): void {
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
    this.dataStore = [...this.dataStore, i];
    localStorage.setItem('items', JSON.stringify(this.dataStore));
    this.itemsSubject.next(this.dataStore);
  }

  getTasks(): Observable<Item[]> {
    return this.items;
  }

  updateTask(item: Item): void {
    this.dataStore = this.dataStore.map((i) => (item === i ? item : i));
    localStorage.setItem('items', JSON.stringify(this.dataStore));
    this.itemsSubject.next(this.dataStore);
  }

  deleteTask(item: Item): void {
    this.dataStore = this.dataStore.filter((i) => i !== item);
    localStorage.setItem('items', JSON.stringify(this.dataStore));
    this.itemsSubject.next(this.dataStore);
  }
}
