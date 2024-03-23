import { TaskStatus } from './task';

export interface TasksFilter {
  status: TaskStatus;
  //   priority: TaskPriority[];
  //   assigneeId: Exclude<TasksListItem['assigneeId'], null>[];
  //   dueDate: Exclude<TasksListItem['dueDate'], null>[];
}

export const intialFilterState: TasksFilter = {
  status: TaskStatus.PENDING,
  //   priority: [],
  //   assigneeId: [],
  //   dueDate: [],
};
