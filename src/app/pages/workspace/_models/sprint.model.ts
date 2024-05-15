import { UserModel } from 'src/app/modules/auth/_models/user.model';

export class SprintModel {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
  creator: UserModel;

  setData(data) {
    this.id = data.id;
    this.name = data.name;
    this.startDate = new Date(data.startDate);
    this.endDate = new Date(data.endDate);
    if (data.creator) {
      const u = new UserModel();
      u.setData(data.creator);
      this.creator = u;
    }
  }
}
