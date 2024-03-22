import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { TasksListFacade } from './data-access/+state/tasks-list.facade';
import { TaskAddFormComponent } from './ui/task-add-form/task-add-form.component';
import { AddTasksListItem } from '../shared/models/tasks-list-item';
import { TasksListViewComponent } from './ui/tasks-list-view/tasks-list-view.component';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [
    TaskAddFormComponent,
    TasksListViewComponent,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TasksListComponent implements OnInit {
  readonly #formBuilder = inject(FormBuilder);
  readonly #tasksListFacade = inject(TasksListFacade);

  tasksAreLoaded = this.#tasksListFacade.tasksAreLoaded;
  tasksList = this.#tasksListFacade.tasksList;

  taskToAdd = signal<Partial<AddTasksListItem> | null>(null);
  readonly taskAddForm = this.#formBuilder.nonNullable.group({
    title: ['', Validators.required],
  });

  constructor() {
    effect(() => {
      const taskToAdd = this.taskToAdd();

      if (!!taskToAdd) {
        this.taskAddForm.reset();
      }
    });
  }

  ngOnInit(): void {
    this.getTasksList();
  }

  private getTasksList(): void {
    this.#tasksListFacade.getTasksList();
  }

  saveTask(): void {
    const task = this.taskAddForm.getRawValue();
    this.#tasksListFacade.addTask(task);
  }
}
