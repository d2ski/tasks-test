import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { TasksListFacade } from './data-access/+state/tasks-list.facade';
import { TaskAddFormComponent } from './ui/task-add-form/task-add-form.component';
import { AddTasksListItem } from '../shared/models/tasks-list-item';
import { TasksListViewComponent } from './ui/tasks-list-view/tasks-list-view.component';
import { TasksFilterFormComponent } from './ui/tasks-filter-form/tasks-filter-form.component';
import { TaskStatus } from '../shared/models/task';
import { TasksFilterForm } from './data-access/models/tasks-filter-form';
import { UsersFacade } from '../users/data-access/+state/users.facade';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [
    TaskAddFormComponent,
    TasksListViewComponent,
    TasksFilterFormComponent,
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
  readonly #usersFacade = inject(UsersFacade);

  tasksAreLoaded = this.#tasksListFacade.tasksAreLoaded;
  tasksList = this.#tasksListFacade.tasksList;
  filter = this.#tasksListFacade.filter;
  #users = this.#usersFacade.users;

  showFilters = false;

  assigneeIds = computed(() => {
    const users = this.#users();

    return users.map((user) => user.id);
  });

  taskToAdd = signal<Partial<AddTasksListItem> | null>(null);

  readonly taskAddForm = this.#formBuilder.nonNullable.group({
    title: ['', Validators.required],
  });

  readonly filterForm = new FormGroup<TasksFilterForm>({
    status: new FormControl(TaskStatus.PENDING, {
      nonNullable: true,
    }),
    priority: new FormControl([], { nonNullable: true }),
    assigneeId: new FormControl([], { nonNullable: true }),
    dueDate: new FormControl(),
  });

  constructor() {
    effect(() => {
      const taskToAdd = this.taskToAdd();

      if (!!taskToAdd) {
        this.taskAddForm.reset();
      }
    });
    effect(() => {
      const filter = this.filter();

      this.filterForm.patchValue(filter);
    });
  }

  ngOnInit(): void {
    this.#tasksListFacade.getTasksList();
    this.#tasksListFacade.getTasksFilter();
  }

  saveTask(): void {
    const task = this.taskAddForm.getRawValue();

    this.#tasksListFacade.addTask(task);
  }

  onFilterUpdate(): void {
    const filter = this.filterForm.getRawValue();

    this.#tasksListFacade.setFilter(filter);
  }

  toogleFilter() {
    this.showFilters = !this.showFilters;
  }
}
