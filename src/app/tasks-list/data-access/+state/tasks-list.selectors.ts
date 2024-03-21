import { createSelector } from '@ngrx/store';
import {
  tasksListAdapter,
  tasksListFeature,
  TasksListState,
} from './tasks-list.reducer';

export const { selectTasksListState } = tasksListFeature;

const { selectAll } = tasksListAdapter.getSelectors();

export const selectTasksListItems = createSelector(
  selectTasksListState,
  (state: TasksListState) => selectAll(state)
);
