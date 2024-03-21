import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { tasksListPageActions } from './tasks-list.actions';
import { AddTasksListItem } from '../../../shared/models/tasks-list-item';
import { selectTasksListItems } from './tasks-list.selectors';
import { Task, TaskStatus } from '../../../shared/models/task';

@Injectable({
  providedIn: 'root',
})
export class TasksListFacade {
  readonly #store = inject(Store);
  tasksList = this.#store.selectSignal(selectTasksListItems);

  public getTasksList(): void {
    this.#store.dispatch(tasksListPageActions.loadTasksList());
  }

  public addTask(task: AddTasksListItem): void {
    const newTask: Task = {
      ...task,
      description: null,
      id: Date.now(),
      assigneeId: null,
      dueDate: null,
      priority: null,
      status: TaskStatus.PENDING,
    };
    this.#store.dispatch(tasksListPageActions.addNewTask({ task: newTask }));
  }
}
