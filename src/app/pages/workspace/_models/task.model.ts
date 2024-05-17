import { UserModel } from 'src/app/modules/auth/_models/user.model';
import { FileStorageModel, WorkModel } from './work.model';

export class TaskModel {
  id: number;
  title: string;
  description: string;
  important: TaskImportantEnum;
  deadline: Date;
  completed: boolean;
  assignee: UserModel;
  files: FileStorageModel[] = [];
  // work: WorkModel;

  setData(data) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description || '';
    this.important = data.important || TaskImportantEnum.Low;
    this.deadline = data.deadline ? new Date(data.deadline) : null;
    this.completed = data?.completed || false;
    if (data?.assignee) {
      const user = new UserModel();
      user.setData(data.assignee);
      this.assignee = user;
    }
    if (data?.files?.length) {
      data.files.map((file) => {
        const f = new FileStorageModel();
        f.setData(file);
        this.files.push(f);
      });
    }
    // if (data?.work) {
    //   const work = new WorkModel();
    //   work.setData(data.work);
    //   this.work = work;
    // }
  }
}

export enum TaskImportantEnum {
  Low = 1,
  Medium = 2,
  High = 3,
}

export function getTaskImportantName(level: TaskImportantEnum) {
  switch (level) {
    case TaskImportantEnum.Low:
      return 'Không quan trọng';
    case TaskImportantEnum.Medium:
      return 'Quan trọng';
    case TaskImportantEnum.High:
      return 'Rất quan trọng';
    default:
      return 'Không quan trọng';
  }
}

export function getTaskImportantColor(level: TaskImportantEnum) {
  switch (level) {
    case TaskImportantEnum.Low:
      return 'secondary';
    case TaskImportantEnum.Medium:
      return 'warning';
    case TaskImportantEnum.High:
      return 'danger';
    default:
      return 'secondary';
  }
}
