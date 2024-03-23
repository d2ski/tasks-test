import { TaskStatus } from './task';
import { TasksListItem } from './tasks-list-item';

export enum SortOrder {
  PRIORITY = 'priority',
  ASSIGNEE_ID = 'assigneeId',
  DUE_DATE = 'dueDate',
}

export interface TasksFilter {
  status: TasksListItem['status'];
  priority: Exclude<TasksListItem['priority'], null>[];
  assigneeId: Exclude<TasksListItem['assigneeId'], null>[];
  dueDate: TasksListItem['dueDate'];
  sorting: SortOrder;
}

export const intialFilterState: TasksFilter = {
  status: TaskStatus.PENDING,
  priority: [],
  assigneeId: [],
  dueDate: null,
  sorting: SortOrder.DUE_DATE,
};
