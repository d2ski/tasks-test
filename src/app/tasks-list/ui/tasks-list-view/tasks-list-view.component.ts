import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { TasksListItem } from '../../../shared/models/tasks-list-item';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { TASK_PRIORITY_DISPLAY } from '../../../shared/models/task-priority-display.const';
import { TaskStatus } from '../../../shared/models/task';

@Component({
  selector: 'app-tasks-list-view',
  standalone: true,
  imports: [
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    RouterLink,
    DatePipe,
  ],
  templateUrl: './tasks-list-view.component.html',
  styleUrl: './tasks-list-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksListViewComponent {
  @Input() tasksList!: TasksListItem[];

  readonly priorityValues = TASK_PRIORITY_DISPLAY;
  readonly statusValues = TaskStatus;
}
