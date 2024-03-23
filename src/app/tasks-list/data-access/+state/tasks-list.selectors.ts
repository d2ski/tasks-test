import { createSelector } from '@ngrx/store';
import {
  tasksListAdapter,
  tasksListFeature,
  TasksListState,
} from './tasks-list.reducer';
import { LoadStatus } from '../../../shared/models/load-status';

export const { selectTasksListState, selectFilter } = tasksListFeature;

const { selectAll } = tasksListAdapter.getSelectors();

export const selectTasksAreLoaded = createSelector(
  selectTasksListState,
  (state: TasksListState) => state.loadStatus === LoadStatus.LOADED
);

export const selectTasksListItems = createSelector(
  selectTasksListState,
  (state: TasksListState) => selectAll(state)
);

export const selectFilteredTasksListItems = createSelector(
  selectTasksListItems,
  selectFilter,
  (tasksListItems, filter) =>
    tasksListItems.filter((task) => task.status === filter.status)
);
