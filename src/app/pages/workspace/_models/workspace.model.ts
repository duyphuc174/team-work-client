import { UserModel } from 'src/app/modules/auth/_models/user.model';

export class WorkspaceModel {
  name: string;
  description: string;
  creator: UserModel;
  members: MemberModel[];

  setData(data) {
    this.name = data.name;
    this.description = data.description;
    if (data.creator) {
      this.creator = new UserModel();
      this.creator.setData(data.creator);
    }
    if (data.members.length) {
      data.members.map((member) => {
        let m = new MemberModel();
        m.setData(member);
        this.members.push(m);
      });
    }
  }
}

export class MemberModel {
  id: number;
  role: string;
  user: UserModel;
  setData(data: any) {
    this.id = data.id;
    this.role = data.role;
    if (data.user) {
      this.user = new UserModel();
      this.user.setData(data.user);
    }
  }
}
