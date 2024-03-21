import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-task-add-form',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './task-add-form.component.html',
  styleUrl: './task-add-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskAddFormComponent {
  @Input({ required: true }) taskAddForm!: FormGroup;
  @Output() readonly close = new EventEmitter<void>();
  @Output() readonly save = new EventEmitter<void>();

  public saveAndClose() {
    if (this.taskAddForm.valid) {
      this.save.emit();
      this.close.emit();
    }
  }
}
