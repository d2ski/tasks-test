import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { TaskFacade } from './data-access/task.facade';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { TaskViewFormComponent } from './ui/task-view-form/task-view-form.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Task, TaskStatus } from '../shared/models/task';
import { TaskForm } from '../shared/models/task-form';
import { UsersFacade } from '../users/data-access/+state/users.facade';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, RouterLink, TaskViewFormComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TaskComponent implements OnInit {
  @Input() taskId!: string;

  readonly #taskFacade = inject(TaskFacade);
  readonly #usersFacade = inject(UsersFacade);
  readonly #router = inject(Router);

  taskIsLoading = this.#taskFacade.taskIsLoading;
  error = this.#taskFacade.error;
  task = this.#taskFacade.task;

  isTaskPending = computed(() => this.task()?.status === TaskStatus.PENDING);

  taskForm = new FormGroup<TaskForm>({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    description: new FormControl(''),
    assigneeId: new FormControl(),
    dueDate: new FormControl(),
    status: new FormControl(TaskStatus.PENDING, { nonNullable: true }),
    priority: new FormControl(),
  });

  users = this.#usersFacade.users;

  constructor() {
    effect(() => {
      const task = this.task();

      if (!task) {
        this.taskForm.reset();
      } else {
        this.taskForm.patchValue({
          ...task,
        });
      }
    });
  }

  ngOnInit(): void {
    this.loadTask();
  }

  private loadTask() {
    this.#taskFacade.loadTask(+this.taskId);
  }

  public toogleTaskStatus() {
    const task = this.task();

    if (task) {
      const status =
        task.status === TaskStatus.PENDING
          ? TaskStatus.DONE
          : TaskStatus.PENDING;

      this.#taskFacade.updateTask({
        ...task,
        status,
      });
    }
  }

  onTaskUpdate() {
    const task = this.task();

    if (task) {
      const taskData = this.taskForm.getRawValue();

      this.#taskFacade.updateTask({
        ...task,
        ...taskData,
      });
    }

    this.#router.navigateByUrl('/list');
  }
}
