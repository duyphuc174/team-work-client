import { UserModel } from 'src/app/modules/auth/_models/user.model';

export class CommentModel {
  id: number;
  content: string;
  creator: UserModel;
  createdAt: Date;

  setData(data) {
    this.id = data.id;
    this.content = data?.content || '';
    if (data?.creator) {
      const u = new UserModel();
      u.setData(data.creator);
      this.creator = u;
    }
    this.createdAt = data?.createdAt ? new Date(data.createdAt) : null;
  }
}

export function tranformDateComment(date: Date): string {
  const now: Date = new Date();
  const diff: number = now.getTime() - date.getTime();

  const minute: number = 60 * 1000;
  const hour: number = minute * 60;
  const day: number = hour * 24;
  const week: number = day * 7;
  const month: number = day * 30; // Giả sử một tháng là 30 ngày
  const year: number = day * 365; // Giả sử một năm là 365 ngày

  if (diff < minute) {
    return Math.floor(diff / 1000) + ' giây trước';
  } else if (diff < hour) {
    return Math.floor(diff / minute) + ' phút trước';
  } else if (diff < day) {
    return Math.floor(diff / hour) + ' giờ trước';
  } else if (diff < week) {
    return Math.floor(diff / day) + ' ngày trước';
  } else if (diff < month) {
    return Math.floor(diff / week) + ' tuần trước';
  } else if (diff < year) {
    return Math.floor(diff / month) + ' tháng trước';
  } else {
    // Trả về ngày tháng năm dưới dạng 'dd-mm-yyyy'
    return date.toLocaleDateString('en-GB');
  }
}
