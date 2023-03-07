import { Directive, ElementRef, HostBinding, Input } from '@angular/core';
import { Priority } from '../models/priority.model';

@Directive({
  selector: '[appTaskColor]',
})
export class TaskColorDirective {
  constructor(private el: ElementRef) {}

  @Input() set priority(p: Priority | null) {
    if (p === Priority.low) {
      this.el.nativeElement.style.setProperty('--bg-color', '#70ffa7');
    } else if (p === Priority.medium) {
      this.el.nativeElement.style.setProperty('--bg-color', '#c8ebf8');
    } else if (p === Priority.high) {
      this.el.nativeElement.style.setProperty('--bg-color', '#f9dfc8');
    } else {
      this.el.nativeElement.style.setProperty('--bg-color', 'lightgray');
    }
  }
}
