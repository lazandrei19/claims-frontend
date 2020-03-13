export default class Player {
  username = '';

  uuid = '';

  noCards = 5;

  score = 0;

  constructor(username: string, uuid: string) {
    this.username = username;
    this.uuid = uuid;
  }
}
