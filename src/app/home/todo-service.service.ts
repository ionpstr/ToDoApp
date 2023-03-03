import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { LoggerService } from '../login/logger.service';
import { pipe, map, Observable } from 'rxjs';
import { Item } from '../models/item.model';
@Injectable()
export class TodoServiceService {
  constructor(
    private logger: LoggerService,
    private http: HttpClient,
    @Inject('API_URL') private api_url: string
  ) {}

  getAllTodos(): Observable<Item[]> {
    const id = this.logger.getUser.id;
    const query = `/todos/user/${id}`;
    const url = this.api_url + query;
    return this.http.get<any>(url).pipe(map((item) => item.todos));
  }
}
