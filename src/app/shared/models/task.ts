import { User } from './user';

export enum TaskStatus {
  PENDING = 'Pending',
  DONE = 'Done',
}

export enum TaskPriority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
}

export type Task = {
  id: number;
  title: string;
  description: string | null;
  assigneeId: User['id'] | null;
  dueDate: string | null;
  status: TaskStatus;
  priority: TaskPriority | null;
};
