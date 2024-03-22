import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../../shared/data-access/api.service';
import { taskApiActions, taskPageActions } from './task.actions';
import { catchError, exhaustMap, map, of } from 'rxjs';

export const loadTask$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(taskPageActions.loadTask),
      exhaustMap(({ taskId }) =>
        apiService.getTaskById(taskId).pipe(
          map((task) => taskApiActions.loadTaskSuccess({ task })),
          catchError((error) => {
            return of(taskApiActions.loadTaskFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const updateTask$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(taskPageActions.updateTask),
      exhaustMap(({ task }) =>
        apiService.postTask(task).pipe(
          map((task) => taskApiActions.updateTaskSuccess({ task })),
          catchError((error) => {
            return of(taskApiActions.updateTaskFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);
