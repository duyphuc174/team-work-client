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
    this.avatar = data.avatar;
    this.birthday = data.birthday;
    this.address = data.address || '';
    this.description = data.description || '';
  }
}

export interface UserRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
