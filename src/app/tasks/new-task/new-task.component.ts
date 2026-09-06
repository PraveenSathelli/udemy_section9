import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  private formEl = viewChild<ElementRef<HTMLFormElement>>('form');
  // private taskService = inject(TaskService);

  constructor(private taskService: TaskService) {

  }

  onAddTask(title: string, description: string) {
    const data = { title: title, description: description };
    this.taskService.addTask(data);
    this.formEl()?.nativeElement.reset();
  }
}
