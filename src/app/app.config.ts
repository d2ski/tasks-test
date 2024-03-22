import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { tasksListFeature } from './tasks-list/data-access/+state/tasks-list.reducer';
import * as tasksListEffects from './tasks-list/data-access/+state/tasks-list.effects';
import * as taskEffects from './task/data-access/task.effects';
import { provideEffects } from '@ngrx/effects';
import { taskFeature } from './task/data-access/task.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideAnimationsAsync(),
    provideStore(),
    provideState(tasksListFeature),
    provideEffects(tasksListEffects),
    provideState(taskFeature),
    provideEffects(taskEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
  ],
};
