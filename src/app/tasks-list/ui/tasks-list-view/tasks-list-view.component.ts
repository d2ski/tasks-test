import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { TasksListItem } from '../../../shared/models/tasks-list-item';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-tasks-list-view',
  standalone: true,
  imports: [MatIconModule, MatCardModule, MatButtonModule],
  templateUrl: './tasks-list-view.component.html',
  styleUrl: './tasks-list-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksListViewComponent {
  @Input() tasksList!: TasksListItem[];
}
