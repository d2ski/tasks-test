import { FormControl } from '@angular/forms';
import { Task } from './task';

export type TaskForm = {
  title: FormControl<Task['title']>;
  description: FormControl<Task['description']>;
  assigneeId: FormControl<Task['assigneeId']>;
  dueDate: FormControl<Task['dueDate']>;
  status: FormControl<Task['status']>;
  priority: FormControl<Task['priority']>;
};
