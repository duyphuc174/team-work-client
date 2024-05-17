import { UserModel } from 'src/app/modules/auth/_models/user.model';
import { ImportantModel } from './workspace.model';
import { SprintModel } from './sprint.model';

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
  files: FileStorageModel[] = [];
  setData(data) {
    this.id = data.id;
    this.title = data.title;
    this.description = data?.description || '';
    this.startDate = data.startDate ? new Date(data.startDate) : null;
    this.endDate = data.endDate ? new Date(data.endDate) : null;
    this.status = data?.status || null;
    if (data?.follower.id) {
      const user = new UserModel();
      user.setData(data.follower);
      this.follower = user;
    }
    if (data?.important) {
      const i = new ImportantModel();
      i.setData(data.important);
      this.important = i;
    }
    if (data?.sprint) {
      const s = new SprintModel();
      s.setData(data.sprint);
      this.sprint = s;
    }
    if (data?.files?.length) {
      data.files.map((file) => {
        const f = new FileStorageModel();
        f.setData(file);
        this.files.push(f);
      });
    }
  }
}

export class FileStorageModel {
  id: number;
  name: string;
  link: string;
  type: string;

  setData(data) {
    this.id = data.id;
    this.name = data?.name || 'Chưa được đặt tên!';
    this.link = data.link;
    this.type = data.type;
  }
}

export enum WorkStatusEnum {
  OPEN = 'open',
  COMPLETE = 'completed',
}

export function getWorkStatusName(status: WorkStatusEnum) {
  switch (status) {
    case WorkStatusEnum.OPEN:
      return 'Đang thực hiện';
    case WorkStatusEnum.COMPLETE:
      return 'Đã hoàn thành';
    default:
      return 'Đang thực hiện';
  }
}

export function getWorkStatusColor(status: WorkStatusEnum) {
  switch (status) {
    case WorkStatusEnum.OPEN:
      return 'success';
    case WorkStatusEnum.COMPLETE:
      return 'secondary';
    default:
      return 'success';
  }
}

export function getImportantColor(level: number) {
  switch (level) {
    case 1:
      return 'info';
    case 2:
      return 'warning';
    case 3:
      return 'danger';
    default:
      return 'secondary';
  }
}

export function getImportantIcon(level: number) {
  switch (level) {
    case 1:
      return 'fa-solid fa-minus';
    case 2:
      return 'fa-solid fa-angle-up';
    case 3:
      return 'fa-solid fa-angles-up';
    default:
      return 'fa-solid fa-minus';
  }
}
