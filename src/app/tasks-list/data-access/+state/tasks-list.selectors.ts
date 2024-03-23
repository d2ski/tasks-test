import { createSelector } from '@ngrx/store';
import {
  tasksListAdapter,
  tasksListFeature,
  TasksListState,
} from './tasks-list.reducer';
import { LoadStatus } from '../../../shared/models/load-status';
import { TasksListItem } from '../../../shared/models/tasks-list-item';
import { SortOrder, TasksFilter } from '../../../shared/models/tasks-filter';
import {
  filterByStatus,
  filterByPriority,
  filterByAssigneeId,
  filterByDueDate,
} from '../../utils/task-filters';
import { TaskPriority } from '../../../shared/models/task';
import { sortBy } from '../../utils/task-sorters';

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
  (tasksListItems: TasksListItem[], filter: TasksFilter) =>
    tasksListItems
      .filter(
        (task) =>
          filterByStatus(task, filter) &&
          filterByPriority(task, filter) &&
          filterByAssigneeId(task, filter) &&
          filterByDueDate(task, filter)
      )
      .sort(sortBy[filter.sorting])
);
