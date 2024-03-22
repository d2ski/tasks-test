import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TaskForm } from '../../../shared/models/task-form';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { TaskPriority } from '../../../shared/models/task';
import { User } from '../../../shared/models/user';
import { TASK_PRIORITY_DISPLAY } from './task-priority-display.const';

@Component({
  selector: 'app-task-view-form',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonToggleModule,
    MatSelectModule,
  ],
  templateUrl: './task-view-form.component.html',
  styleUrl: './task-view-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskViewFormComponent {
  @Input({ required: true }) taskForm!: FormGroup<TaskForm>;
  @Input() assignees: User[] = [];
  @Output() update = new EventEmitter<void>();

  readonly priorityValues = Object.entries(TASK_PRIORITY_DISPLAY);

  onSubmit() {
    this.update.emit();
  }
}
