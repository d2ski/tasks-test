import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TasksFilterForm } from '../../data-access/models/tasks-filter-form';
import { MatChipsModule } from '@angular/material/chips';
import { TASK_STATUS_DISPLAY } from '../../../shared/models/task-status-display.const';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { debounceTime, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-tasks-filter-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './tasks-filter-form.component.html',
  styleUrl: './tasks-filter-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksFilterFormComponent implements OnInit {
  @Input({ required: true }) filterForm!: FormGroup<TasksFilterForm>;
  @Output() update = new EventEmitter<void>();

  destroyRef = inject(DestroyRef);
  readonly #destroyed = new Subject<void>();

  readonly statusValues = Object.entries(TASK_STATUS_DISPLAY);

  onSubmit() {
    console.log(this.filterForm.getRawValue());
  }

  ngOnInit(): void {
    this.destroyRef.onDestroy(() => {
      this.#destroyed.next();
      this.#destroyed.complete();
    });

    this.listenFilterFormChange();
  }

  private listenFilterFormChange() {
    this.filterForm.valueChanges
      .pipe(debounceTime(100), takeUntil(this.#destroyed))
      .subscribe(() => this.update.emit());
  }
}
