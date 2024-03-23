import { FormControl } from '@angular/forms';
import { Task } from '../../../shared/models/task';

export type TasksFilterForm = {
  status: FormControl<Task['status']>;
};
