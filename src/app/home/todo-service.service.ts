import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { LoggerService } from '../login/logger.service';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Item } from '../models/item.model';
@Injectable()
export class TodoServiceService {
  constructor(
    private logger: LoggerService,
    private http: HttpClient,
    @Inject('API_URL') private api_url: string
  ) {}
  items: Subject<Item[]> = new BehaviorSubject(
    JSON.parse(localStorage.getItem('items') as string)
  );

  setTasks(items: Item[]): void {
    localStorage.setItem('items', JSON.stringify([...items]));
    this.items.next([...items]);
  }
  getTasks(): Observable<Item[]> {
    if (localStorage.getItem('items')) {
      this.items.next(JSON.parse(localStorage.getItem('items') as string));
    }
    return this.items;
  }
  deleteTasks() {
    localStorage.removeItem('items');
  }
}
