import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Task } from '../../../shared/models/task';
import { TasksFilter } from '../../../shared/models/tasks-filter';

export const tasksListPageActions = createActionGroup({
  source: 'Tasks List Page',
  events: {
    loadTasksList: emptyProps(),
    addNewTask: props<{ task: Task }>(),
    loadFilter: emptyProps(),
    setFilter: props<{ filter: TasksFilter }>(),
  },
});

export const tasksListApiActions = createActionGroup({
  source: 'Tasks List API',
  events: {
    loadTasksListSuccess: props<{ tasks: Task[] }>(),
    loadTasksListFailure: props<{ error: Error }>(),
    addNewTaskSuccess: emptyProps(),
    addNewTaskFailure: props<{ error: Error }>(),
    loadFilterSuccess: props<{ filter: TasksFilter }>(),
    loadFilterFailure: props<{ error: Error }>(),
    setFilterSuccess: emptyProps(),
    setFilterFailure: props<{ error: Error }>(),
  },
});
