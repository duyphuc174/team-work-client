import { AuthModel } from './auth.model';

export class UserModel extends AuthModel {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  fullName: string;
  avatar: string;
  birthday: Date;
  address: string;
  description: string;
  workspaceRole: string;
  role: UserRoleModel;
  selectName?: string;

  constructor(data: any = {}) {
    super();
    this.setData(data);
  }

  setData(data: any) {
    this.id = data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.phone = data.phoneNumber;
    this.fullName = this.firstName + ' ' + this.lastName;
    this.avatar = data.avatar || 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gough.png';
    this.birthday = data.birthday ? new Date(data.birthday) : null;
    this.address = data.address || '';
    this.description = data.description || '';
    if (data?.role) {
      this.role = new UserRoleModel();
      this.role.setData(data.role);
    }
  }
}

export class UserRoleModel {
  id: number;
  name: string;

  setData(data: any) {
    this.id = data.id;
    this.name = data.name;
  }
}

export function getUserRoleName(role: string) {
  switch (role) {
    case 'admin':
      return 'Quản trị viên';
    case 'member':
      return 'Thành viên';
    default:
      return 'Thành viên';
  }
}

export function tranformUserBagdeClass(role: string) {
  switch (role) {
    case 'admin':
      return 'primary';
    case 'member':
      return 'secondary';
    default:
      return 'secondary';
  }
}

export interface UserRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
