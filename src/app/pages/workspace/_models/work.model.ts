import { UserModel } from 'src/app/modules/auth/_models/user.model';
import { ImportantModel, SprintModel } from './workspace.model';

export class WorkModel {
  id: number;
  title: string;
  description: string;
  follower: UserModel;
  status: WorkStatusEnum;
  important: ImportantModel;
  startDate: Date;
  endDate: Date;
  sprint: SprintModel;
  setData(data) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.startDate = new Date(data.startDate);
    this.endDate = new Date(data.endDate);
    this.status = data.status;
    if (data.follower.id) {
      const user = new UserModel();
      user.setData(data.follower);
      this.follower = user;
    }
    if (data.important) {
      const i = new ImportantModel();
      i.setData(data.important);
      this.important = i;
    }
    if (data.sprint) {
      const s = new SprintModel();
      s.setData(data.sprint);
      this.sprint = s;
    }
  }
}

export enum WorkStatusEnum {
  OPEN = 'open',
  CLOSE = 'close',
  COMPLETE = 'complete',
}
