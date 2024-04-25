export class AuthModel {
  authToken: string;

  setAuth(data: any) {
    this.authToken = data.token;
  }
}
