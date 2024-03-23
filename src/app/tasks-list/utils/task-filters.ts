import { TasksFilter } from '../../shared/models/tasks-filter';
import { TasksListItem } from '../../shared/models/tasks-list-item';

export const filterByStatus = (
  task: TasksListItem,
  filter: TasksFilter
): boolean => task.status === filter.status;

export const filterByPriority = (
  task: TasksListItem,
  filter: TasksFilter
): boolean => {
  if (!filter.priority.length) {
    return true;
  }

  if (!task.priority) {
    return false;
  }

  return filter.priority.includes(task.priority);
};

export const filterByAssigneeId = (
  task: TasksListItem,
  filter: TasksFilter
): boolean => {
  if (!filter.assigneeId.length) {
    return true;
  }

  if (!task.assigneeId) {
    return false;
  }

  return filter.assigneeId.includes(task.assigneeId);
};

export const filterByDueDate = (
  task: TasksListItem,
  filter: TasksFilter
): boolean => {
  if (!filter.dueDate) {
    return true;
  }

  if (!task.dueDate) {
    return false;
  }

  return Date.parse(task.dueDate) <= Date.parse(filter.dueDate);
};
