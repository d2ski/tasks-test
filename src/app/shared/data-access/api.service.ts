import { inject, Injectable } from '@angular/core';
import { TasksListItem } from '../models/tasks-list-item';
import { EMPTY, Observable, of, switchMap, timer } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  readonly #storage = inject(LocalStorageService);

  getTasks(): Observable<Task[]> {
    return timer(1000).pipe(switchMap(() => of(this.#storage.selectTasks())));
  }

  postTask(task: Task): Observable<Task> {
    this.#storage.upsertTask(task);

    return of(task);
  }
}
