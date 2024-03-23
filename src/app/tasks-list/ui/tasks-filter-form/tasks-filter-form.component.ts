import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TasksFilterForm } from '../../../shared/models/tasks-filter-form';
import { TASK_STATUS_DISPLAY } from '../../../shared/models/task-status-display.const';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { TASK_PRIORITY_DISPLAY } from '../../../shared/models/task-priority-display.const';
import { TasksFilter } from '../../../shared/models/tasks-filter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { SORT_ORDER_DISPLAY } from '../../../shared/models/sort-order-display.const';

@Component({
  selector: 'app-tasks-filter-form',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
  ],
  templateUrl: './tasks-filter-form.component.html',
  styleUrl: './tasks-filter-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksFilterFormComponent {
  @Input({ required: true }) filterForm!: FormGroup<TasksFilterForm>;
  @Input() assigneeIds: TasksFilter['assigneeId'] | undefined;
  @Output() update = new EventEmitter<void>();

  readonly statusValues = Object.entries(TASK_STATUS_DISPLAY);
  readonly priorityValues = Object.entries(TASK_PRIORITY_DISPLAY);
  readonly sortingValues = Object.entries(SORT_ORDER_DISPLAY);

  onSubmit() {
    console.log(this.filterForm.getRawValue());
    this.update.emit();
  }
}
