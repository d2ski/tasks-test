import { TaskStatus } from './task';

export const TASK_STATUS_DISPLAY = {
  [TaskStatus.PENDING]: 'В процессе',
  [TaskStatus.DONE]: 'Завершено',
} as const;
