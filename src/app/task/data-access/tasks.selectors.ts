import { createSelector } from '@ngrx/store';
import { taskFeature } from './task.reducer';
import { LoadStatus } from '../../shared/models/load-status';

export const { selectTaskState, selectLoadStatus, selectError, selectTask } =
  taskFeature;

export const selectTaskIsLoading = createSelector(
  selectLoadStatus,
  (loadStatus) => loadStatus === LoadStatus.LOADING
);
