import { Priority } from './priority.model';
import { Time } from './time.model';

export class Item {
  id?: number;
  todo?: string;
  completed?: boolean;
  userId?: string | null;
  createdAt?: Date;
  date?: Date | null;
  from?: Time | null;
  to?: Time | null;
  priority?: Priority;
  constructor(item: any) {
    this.id = item.id;
    this.todo = item.todo;
    this.completed = item.completed;
    this.userId = item.userId;
    this.createdAt = item.createdAt;
    this.date = item.date;
    this.from = item.from;
    this.to = item.to;
    this.priority = item.priority;
  }
}
