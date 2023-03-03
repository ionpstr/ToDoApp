import { Component, Input } from '@angular/core';
import { Item } from 'src/app/models/item.model';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.less'],
})
export class TodoComponent {
  @Input() todo!: Item;
}
