export class SprintModel {
  name: string;
  startDate: Date;
  endDate: Date;

  setData(data) {
    this.name = data.name;
    this.startDate = new Date(data.startDate);
    this.endDate = new Date(data.endDate);
  }
}
