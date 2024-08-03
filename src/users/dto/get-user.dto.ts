import { User } from '../user.entity';

export class GetUserDto {
  id: number;
  username: string;
  email: string;

  constructor(id: number, username: string, email: string) {
    this.id = id;
    this.username = username;
    this.email = email;
  }

  static fromUser(user: User): GetUserDto {
    return new GetUserDto(user.id, user.username, user.email);
  }
}
