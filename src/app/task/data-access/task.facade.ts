import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { taskPageActions } from './task.actions';
import {
  selectError,
  selectTask,
  selectTaskIsLoading,
} from './tasks.selectors';
import { Task } from '../../shared/models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskFacade {
  readonly #store = inject(Store);

  taskIsLoading = this.#store.selectSignal(selectTaskIsLoading);
  task = this.#store.selectSignal(selectTask);
  error = this.#store.selectSignal(selectError);

  public loadTask(taskId: number) {
    this.#store.dispatch(taskPageActions.loadTask({ taskId }));
  }

  public updateTask(task: Task) {
    this.#store.dispatch(taskPageActions.updateTask({ task }));
  }
}
