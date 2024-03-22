import { createFeature, createReducer, on } from '@ngrx/store';
import { LoadStatus } from '../../shared/models/load-status';
import { Task } from '../../shared/models/task';
import { taskApiActions, taskPageActions } from './task.actions';

export interface TaskState {
  task: Task | null;
  loadStatus: LoadStatus;
  error: string | null;
}

export const initialTaskState: TaskState = {
  task: null,
  loadStatus: LoadStatus.INIT,
  error: null,
};

export const taskFeature = createFeature({
  name: 'task',
  reducer: createReducer(
    initialTaskState,
    on(taskPageActions.loadTask, (state) => ({
      ...state,
      task: null,
      error: null,
      loadStatus: LoadStatus.LOADING,
    })),
    on(taskApiActions.loadTaskSuccess, (state, { task }) => ({
      ...state,
      task,
      loadStatus: LoadStatus.LOADED,
    })),
    on(taskApiActions.loadTaskFailure, (state: TaskState, { error }) => ({
      ...state,
      error: error.message,
      task: null,
      loadStatus: LoadStatus.ERROR,
    })),
    on(taskPageActions.updateTask, (state: TaskState, { task }) => ({
      ...state,
      task,
    }))
  ),
});
