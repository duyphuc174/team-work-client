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
  role: MemberRoleEnum;
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

export class ImportantModel {
  id: number;
  level: number;
  name: string;

  setData(data) {
    this.id = data.id;
    this.level = data.level || 1;
    if (data.level) {
      this.name = getImportantName(data.level);
    }
  }
}

export enum MemberRoleEnum {
  CREATOR = 'creator',
  ADMIN = 'admin',
  MEMBER = 'member',
}

function getImportantName(level: number) {
  switch (level) {
    case 1:
      return 'Bình thường';
    case 2:
      return 'Quan trọng';
    default:
      return 'Rất quan trọng';
  }
}

export function getMemberRoleName(role: MemberRoleEnum) {
  switch (role) {
    case MemberRoleEnum.CREATOR:
      return 'Người tạo nhóm';
    case MemberRoleEnum.ADMIN:
      return 'Quản trị viên';
    default:
      return 'Thành viên';
  }
}

export function tranformRoleBagdeClass(role: MemberRoleEnum) {
  switch (role) {
    case 'creator':
      return 'bg-primary';
    case 'admin':
      return 'bg-success';
    default:
      return 'bg-secondary';
  }
}
