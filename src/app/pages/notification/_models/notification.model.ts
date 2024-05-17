import { UserModel } from 'src/app/modules/auth/_models/user.model';
import { WorkspaceModel } from '../../workspace/_models/workspace.model';

export class NotificationModel {
  id: number;
  content: string;
  type: string;
  link: string;
  read: boolean;
  receiver: UserModel;
  sender?: UserModel;
  workspace?: WorkspaceModel;
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
    if (data?.sender?.id) {
      const user = new UserModel();
      user.setData(data.sender);
      this.sender = user;
    }
    if (data?.workspace?.id) {
      const workspace = new WorkspaceModel();
      workspace.setData(data.workspace);
      this.workspace = workspace;
    }
    this.createdAt = new Date(data.createdAt);
  }
}
