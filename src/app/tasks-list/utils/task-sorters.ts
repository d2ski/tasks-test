import { TaskPriority } from '../../shared/models/task';
import { SortOrder } from '../../shared/models/tasks-filter';
import { TasksListItem } from '../../shared/models/tasks-list-item';

const sortByDueDate = (a: TasksListItem, b: TasksListItem): number => {
  if (a.dueDate === null && b.dueDate === null) return 0;
  if (a.dueDate === null) return 1;
  if (b.dueDate === null) return -1;

  return Date.parse(a.dueDate) - Date.parse(b.dueDate);
};

const sortByAssigneeId = (a: TasksListItem, b: TasksListItem): number => {
  if (a.assigneeId === null && b.assigneeId === null) return 0;
  if (a.assigneeId === null) return 1;
  if (b.assigneeId === null) return -1;

  return a.assigneeId.localeCompare(b.assigneeId);
};

const sortByPriority = (a: TasksListItem, b: TasksListItem): number => {
  const priorityOrder = [
    TaskPriority.LOW,
    TaskPriority.MEDIUM,
    TaskPriority.HIGH,
  ];

  if (a.priority === null && b.priority === null) return 0;
  if (a.priority === null) return 1;
  if (b.priority === null) return -1;

  return priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority);
};

export const sortBy = {
  [SortOrder.DUE_DATE]: sortByDueDate,
  [SortOrder.ASSIGNEE_ID]: sortByAssigneeId,
  [SortOrder.PRIORITY]: sortByPriority,
};
