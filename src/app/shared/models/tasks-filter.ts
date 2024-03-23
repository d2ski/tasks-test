import { TaskStatus } from './task';
import { TasksListItem } from './tasks-list-item';

export interface TasksFilter {
  status: TasksListItem['status'];
  priority: Exclude<TasksListItem['priority'], null>[];
  assigneeId: Exclude<TasksListItem['assigneeId'], null>[];
  dueDate: TasksListItem['dueDate'];
}

export const intialFilterState: TasksFilter = {
  status: TaskStatus.PENDING,
  priority: [],
  assigneeId: [],
  dueDate: null,
};
