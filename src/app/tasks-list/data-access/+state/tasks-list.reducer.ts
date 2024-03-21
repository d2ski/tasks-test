import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { TasksListItem } from '../../../shared/models/tasks-list-item';
import { LoadStatus } from '../../../shared/models/load-status';
import { createFeature, createReducer, on } from '@ngrx/store';
import {
  tasksListApiActions,
  tasksListPageActions,
} from './tasks-list.actions';
import { TaskPriority, TaskStatus } from '../../../shared/models/task';

export interface FilterState {
  status: TaskStatus[];
  priority: TaskPriority[];
  assigneeId: Exclude<TasksListItem['assigneeId'], null>[];
  dueDate: Exclude<TasksListItem['dueDate'], null>[];
}

export const intialFilterState: FilterState = {
  status: [],
  priority: [],
  assigneeId: [],
  dueDate: [],
};

export interface TasksListState extends EntityState<TasksListItem> {
  loadStatus: LoadStatus;
  filter: FilterState;
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
      tasksListAdapter.upsertMany(tasks, state)
    ),
    on(tasksListPageActions.addNewTask, (state, { task }) =>
      tasksListAdapter.addOne(task, state)
    )
  ),
});
