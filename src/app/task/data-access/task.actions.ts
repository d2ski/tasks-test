import { createActionGroup, props } from '@ngrx/store';
import { Task } from '../../shared/models/task';

export const taskPageActions = createActionGroup({
  source: 'Task Page',
  events: {
    loadTask: props<{ taskId: Task['id'] }>(),
    updateTask: props<{ task: Task }>(),
  },
});

export const taskApiActions = createActionGroup({
  source: 'Task API',
  events: {
    loadTaskSuccess: props<{ task: Task }>(),
    loadTaskFailure: props<{ error: Error }>(),
    updateTaskSuccess: props<{ task: Task }>(),
    updateTaskFailure: props<{ error: Error }>(),
  },
});
