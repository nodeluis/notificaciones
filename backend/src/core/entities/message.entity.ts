export class MessageEntity{

  account: string = "";
  message: string = "";

  constructor(acc: string, mess: string) {
    this.account = acc;
    this.message = mess;
  }

}