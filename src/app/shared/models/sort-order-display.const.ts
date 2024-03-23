import { SortOrder } from './tasks-filter';

export const SORT_ORDER_DISPLAY = {
  [SortOrder.PRIORITY]: 'По приоритету',
  [SortOrder.ASSIGNEE_ID]: 'По исполнителю',
  [SortOrder.DUE_DATE]: 'По дедлайну',
} as const;
