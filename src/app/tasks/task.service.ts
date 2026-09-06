import { inject, Injectable, signal } from "@angular/core";
import { Task, TaskStatus } from "./task.model";
import { LoggingService } from "../logging.service";
@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private tasks = signal<Task[]>([]);

    private logservice = inject(LoggingService);

    allTasks = this.tasks.asReadonly()

    addTask(taskData: { title: string, description: string }) {
        const newTask:Task = {
            ...taskData,
            id: Math.random().toString(),
            status: 'OPEN'
        };
        this.tasks.update((oldTasks) => [...oldTasks,newTask])
        this.logservice.log('ADDED TASK WITH TITLE' + taskData.title);
    }

    updateTaskStatus(taskId:string,status:TaskStatus)
    {
        this.tasks.update((oldtasks) => 
            oldtasks.map((task) => task.id === taskId ? {
                ...task, status:status }: task)
        )
        this.logservice.log('Chnage task with status  ' + status)
    }
}