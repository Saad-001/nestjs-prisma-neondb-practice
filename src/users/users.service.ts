/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/CreateUser.dto';
import { UpdateUserDto } from 'src/dto/UpdateUser.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Leanne Graham',
      email: 'Sincere@april.biz',
      role: 'INTERN',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      email: 'Shanna@melissa.tv',
      role: 'INTERN',
    },
    {
      id: 3,
      name: 'Clementine Bauch',
      email: 'Nathan@yesenia.net',
      role: 'ENGINEER',
    },
    {
      id: 4,
      name: 'Patricia Lebsack',
      email: 'Julianne.OConner@kory.org',
      role: 'ENGINEER',
    },
    {
      id: 5,
      name: 'Chelsey Dietrich',
      email: 'Lucio_Hettinger@annie.ca',
      role: 'ADMIN',
    },
  ];

  findAllUsers(role?: 'INTERN' | 'ADMIN' | 'ENGINEER') {
    if (role) {
      const usersArr = this.users.filter((user) => user.role === role);
      if (usersArr.length === 0) {
        throw new NotFoundException('User not found with the given role!');
      }
      return usersArr;
    }
    return this.users;
  }

  findOneUser(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User not found!');
    return user;
  }

  createUser(user: CreateUserDto) {
    const usersByHeightsId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHeightsId[0].id + 1,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id: number, updatedUser: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          ...updatedUser,
        };
      }
      return user;
    });

    return this.findOneUser(id);
  }

  deleteUser(id: number) {
    const deletedUser = this.findOneUser(id);
    this.users = this.users.filter((user) => user.id != id);
    return deletedUser;
  }
}
