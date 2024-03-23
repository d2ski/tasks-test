import { FormControl } from '@angular/forms';
import { TasksFilter } from '../../../shared/models/tasks-filter';

export type TasksFilterForm = {
  status: FormControl<TasksFilter['status']>;
  priority: FormControl<TasksFilter['priority']>;
  assigneeId: FormControl<TasksFilter['assigneeId']>;
  dueDate: FormControl<TasksFilter['dueDate']>;
};
