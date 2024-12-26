import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Role } from 'src/role';

@Injectable()
export class UserService {
  public users: User[] = [
    {
      username: 'User1',
      password: 'admin',
      email: 'user1@gmail.com',
      age: 21,
      role: Role.ROLES.ANDROID_DEVELOPER
    },
    {
      username: 'User2',
      password: 'admin',
      email: 'user2@gmail.com',
      age : 22,
      role : Role.ROLES.WEB_DEVELOPER
    },
    {
      username: 'User3',
      password: 'admin',
      email: 'user3@gmail.com',
      age : 25,
      role: Role.ROLES.ANDROID_DEVELOPER
    },
    {
      username: 'User4',
      password: 'admin',
      email: 'user4@gmail.com',
      age : 24,
      role: Role.ROLES.WEB_DEVELOPER,
    },
  ];

  getUserByName(userName: string): User {
    return this.users.find((user) => user.username === userName);
  }
}
