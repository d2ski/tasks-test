import { inject, Injectable } from '@angular/core';
import { TasksListItem } from '../models/tasks-list-item';
import { EMPTY, Observable, of, switchMap, timer } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { Task } from '../models/task';
import { TasksFilter } from '../models/tasks-filter';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  readonly #storage = inject(LocalStorageService);

  public getTasks(): Observable<Task[]> {
    // симуляция запроса на бэкенд с задержкой ответа
    return timer(1000).pipe(switchMap(() => of(this.#storage.selectTasks())));
  }

  public getTaskById(id: number): Observable<Task> {
    // симуляция запроса на бэкенд с задержкой ответа
    return timer(1000).pipe(
      switchMap(() => of(this.#storage.selectTaskById(id)))
    );
  }

  public postTask(task: Task): Observable<Task> {
    this.#storage.upsertTask(task);

    return of(task);
  }

  public getFilter(): Observable<TasksFilter> {
    return timer(200).pipe(switchMap(() => of(this.#storage.selectFilter())));
  }

  public postFilter(filter: TasksFilter): Observable<TasksFilter> {
    this.#storage.upsertFilter(filter);

    return of(filter);
  }
}
