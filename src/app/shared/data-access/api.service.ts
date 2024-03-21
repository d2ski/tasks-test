import { Injectable } from '@angular/core';
import { TasksListItem } from '../models/tasks-list-item';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor() {}

  getTasksList(): Observable<TasksListItem[]> {
    return of([]);
  }
}
