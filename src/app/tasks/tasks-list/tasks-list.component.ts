import { Component, computed, inject, signal } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
})
export class TasksListComponent {
  private taskService = inject(TaskService);
  private selectedFilter = signal<string>('all');
  tasks = computed(() => {
    switch(this.selectedFilter())
    {
      case 'open':
        return this.taskService.allTasks().filter(x=> x.status ==='OPEN');
      case 'in-progress':
          return this.taskService.allTasks().filter(x=> x.status ==='IN_PROGRESS');
      case 'done':
          return this.taskService.allTasks().filter(x=> x.status ==='DONE');
      default:
        return this.taskService.allTasks();
    }
  });

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
