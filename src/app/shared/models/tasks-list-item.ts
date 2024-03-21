import { Task } from './task';

export type TasksListItem = Omit<Task, 'description'>;
export type AddTasksListItem = Omit<
  TasksListItem,
  'id' | 'assigneeId' | 'dueDate' | 'status' | 'priority'
>;
