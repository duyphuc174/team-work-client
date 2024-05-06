import { UserModel } from 'src/app/modules/auth/_models/user.model';

export class TaskModel {
  id: number;
  title: string;
  description: string;
  important: TaskImportantEnum;
  deadline: Date;
  isComplete: boolean;
  assignee: UserModel;

  setData(data) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description || '';
    this.important = data.important || TaskImportantEnum.Low;
    this.deadline = data.deadline ? new Date(data.deadline) : null;
    this.isComplete = data?.isComplete || false;
    if (data.assignee) {
      const user = new UserModel();
      user.setData(data.assignee);
      this.assignee = user;
    }
  }
}

export enum TaskImportantEnum {
  Low = 1,
  Medium = 2,
  High = 3,
}
