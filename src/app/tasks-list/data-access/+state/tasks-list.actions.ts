import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
  AddTasksListItem,
  TasksListItem,
} from '../../../shared/models/tasks-list-item';

export const tasksListPageActions = createActionGroup({
  source: 'Tasks List Page',
  events: {
    loadTasksList: emptyProps(),
    addNewTask: props<{ task: AddTasksListItem }>(),
  },
});

export const tasksListApiActions = createActionGroup({
  source: 'Tasks List API',
  events: {
    loadTasksListSuccess: props<{ tasksListItems: TasksListItem[] }>(),
    loadTasksListFailure: props<{ error: Error }>(),
  },
});
