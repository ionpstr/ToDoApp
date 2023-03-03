import { Priority } from './priority.model';

export type Item = {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
  date?: Date;
  time?: Date;
  priority?: Priority;
};
