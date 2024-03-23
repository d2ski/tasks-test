import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { TasksListItem } from '../../../shared/models/tasks-list-item';
import { LoadStatus } from '../../../shared/models/load-status';
import { createFeature, createReducer, on } from '@ngrx/store';
import {
  tasksListApiActions,
  tasksListPageActions,
} from './tasks-list.actions';
import {
  TasksFilter,
  intialFilterState,
} from '../../../shared/models/tasks-filter';

export interface TasksListState extends EntityState<TasksListItem> {
  loadStatus: LoadStatus;
  filter: TasksFilter;
}

export const tasksListAdapter: EntityAdapter<TasksListItem> =
  createEntityAdapter<TasksListItem>();

export const initialTasksListState = tasksListAdapter.getInitialState({
  loadStatus: LoadStatus.INIT,
  filter: intialFilterState,
});

export const tasksListFeature = createFeature({
  name: 'tasksList',
  reducer: createReducer(
    initialTasksListState,
    on(tasksListPageActions.loadTasksList, (state) => ({
      ...state,
      loadStatus: LoadStatus.LOADING,
    })),
    on(tasksListApiActions.loadTasksListSuccess, (state, { tasks }) =>
      tasksListAdapter.upsertMany(tasks, {
        ...state,
        loadStatus: LoadStatus.LOADED,
      })
    ),
    on(tasksListPageActions.addNewTask, (state, { task }) =>
      tasksListAdapter.addOne(task, state)
    ),
    on(tasksListApiActions.loadFilterSuccess, (state, { filter }) => ({
      ...state,
      filter,
    })),
    on(tasksListPageActions.setFilter, (state, { filter }) => ({
      ...state,
      filter,
    }))
  ),
});
