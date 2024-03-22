import { TaskPriority } from './task';

export const TASK_PRIORITY_DISPLAY = {
  [TaskPriority.LOW]: 'Низкий',
  [TaskPriority.MEDIUM]: 'Средний',
  [TaskPriority.HIGH]: 'Высокий',
} as const;
