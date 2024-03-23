import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../../../shared/data-access/api.service';
import {
  tasksListApiActions,
  tasksListPageActions,
} from './tasks-list.actions';
import { catchError, exhaustMap, map, of } from 'rxjs';

export const addNewTask$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(tasksListPageActions.addNewTask),
      exhaustMap(({ task }) =>
        apiService.postTask(task).pipe(
          map(() => tasksListApiActions.addNewTaskSuccess()),
          catchError((error) => {
            return of(tasksListApiActions.addNewTaskFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const loadTasksList$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(tasksListPageActions.loadTasksList),
      exhaustMap(() =>
        apiService.getTasks().pipe(
          map((tasks) => tasksListApiActions.loadTasksListSuccess({ tasks })),
          catchError((error) => {
            return of(tasksListApiActions.loadTasksListFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const loadFilter$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(tasksListPageActions.loadFilter),
      exhaustMap(() =>
        apiService.getFilter().pipe(
          map((filter) => tasksListApiActions.loadFilterSuccess({ filter })),
          catchError((error) => {
            return of(tasksListApiActions.loadFilterFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const setFilter$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(tasksListPageActions.setFilter),
      exhaustMap(({ filter }) =>
        apiService.postFilter(filter).pipe(
          map(() => tasksListApiActions.setFilterSuccess()),
          catchError((error) => {
            return of(tasksListApiActions.setFilterFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);
