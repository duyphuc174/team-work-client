import { UserModel } from 'src/app/modules/auth/_models/user.model';

export class NotificationModel {
  id: number;
  content: string;
  type: string;
  link: string;
  read: boolean;
  receiver: UserModel;
  createdAt: Date;

  setData(data: any) {
    this.id = data.id;
    this.content = data.content || '';
    this.type = data.type || '';
    this.link = data.link || '/';
    this.read = data.read || false;
    if (data?.receiver?.id) {
      const user = new UserModel();
      user.setData(data.receiver);
      this.receiver = user;
    }
    this.createdAt = new Date(data.createdAt);
  }
}
