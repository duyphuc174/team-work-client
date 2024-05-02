import { UserModel } from 'src/app/modules/auth/_models/user.model';

export class WorkspaceModel {
  id: number;
  name: string;
  description: string;
  creator: UserModel;
  members: MemberModel[];

  setData(data) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    if (data.creator) {
      this.creator = new UserModel();
      this.creator.setData(data.creator);
    }
    if (data?.members?.length) {
      this.members = [];
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
  roleName: string;
  setData(data: any) {
    this.id = data.id;
    this.role = data.role;
    if (data.user) {
      this.user = new UserModel();
      this.user.setData(data.user);
    }
    this.roleName = getMemberRoleName(this.role);
  }
}

export function getMemberRoleName(role: string) {
  switch (role) {
    case 'creator':
      return 'Người tạo nhóm';
    case 'admin':
      return 'Quản trị viên';
    default:
      return 'Thành viên';
  }
}

export function tranformRoleBagdeClass(role: string) {
  switch (role) {
    case 'creator':
      return 'bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300';
    case 'admin':
      return 'bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300';
    default:
      return 'bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300';
  }
}
