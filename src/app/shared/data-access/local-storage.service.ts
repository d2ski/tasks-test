import { inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE } from '../providers/local-storage';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  readonly #storage = inject(LOCAL_STORAGE);

  selectTasks(): Task[] {
    const tasks = this.#storage.getItem('tasks');

    if (tasks) {
      return JSON.parse(tasks) as Task[];
    }

    return [];
  }

  selectTaskById(id: number): Task {
    const tasks = this.selectTasks();
    const selectedTask = tasks.find((t) => t.id === id);

    if (!selectedTask) {
      throw new Error('Not found');
    }

    return selectedTask;
  }

  upsertTask(task: Task): void {
    const tasks = this.selectTasks();
    const filteredTasks = tasks.filter((t) => t.id !== task.id);

    this.#storage.setItem('tasks', JSON.stringify([...filteredTasks, task]));
  }
}
