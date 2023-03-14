import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item } from 'src/app/models/item.model';
import { Priority } from 'src/app/models/priority.model';

@Component({
  selector: 'app-active-input',
  templateUrl: './active-input.component.html',
  styleUrls: ['./active-input.component.less'],
})
export class ActiveInputComponent {
  myForm: FormGroup;
  edit = false;
  clearItem: Item = {
    todo: '',
    date: null,
    from: null,
    to: null,
    priority: Priority.low,
  };
  @Input() set item(item: Item | null) {
    if (item) {
      this.updateForm(this.myForm, item);
      this.edit = true;
    }
  }
  @Output() newTask: EventEmitter<Item> = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      todo: [this.clearItem.todo, Validators.required],
      date: [this.clearItem.date, Validators.required],
      from: [this.clearItem.from],
      to: [this.clearItem.to],
      priority: [this.clearItem.priority, Validators.required],
    });
    this.myForm.valueChanges.subscribe(
      (val) => (val.priority = parseInt(val.priority))
    );
  }

  updateForm(myForm: FormGroup, item: Item) {
    let d = null;

    if (item.date != null) {
      item.date = new Date(item.date);

      d = {
        year: item.date.getFullYear(),
        month: item.date.getMonth() + 1,
        day: item.date.getDate(),
      };
    }

    myForm.patchValue({
      todo: item.todo,
      priority: item.priority,
      from: item.from,
      to: item.to,
      date: d,
    });
  }

  handleSubmit(val: FormGroup) {
    const date =
      val.controls['date'].value != null
        ? new Date(
            parseInt(val.value.date.year),
            parseInt(val.value.date.month) - 1,
            parseInt(val.value.date.day)
          )
        : null;

    if (val.valid) {
      this.newTask.emit({
        todo: val.value.todo,
        date: date,
        from: val.value.from,
        to: val.value.to,
        priority: val.value.priority,
      });
    }

    this.updateForm(this.myForm, this.clearItem);
    this.edit = false;
  }
}
