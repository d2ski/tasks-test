import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { tasksListFeature } from './tasks-list/data-access/+state/tasks-list.reducer';
import * as tasksListEffects from './tasks-list/data-access/+state/tasks-list.effects'
import { provideEffects } from '@ngrx/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideStore(),
    provideState(tasksListFeature),
    provideEffects(tasksListEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
  ],
};
