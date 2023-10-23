import { CreateUserDto } from '@/users/domain/dtos/createUser.dto';
import { UpdateUserDto } from '@/users/domain/dtos/updateUser.dto';
import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(createUserDto: CreateUserDto) {
    return this.usersRepository.createUser(createUserDto);
  }

  async getUsers() {
    return this.usersRepository.getUsers();
  }

  async getUserById(id: string) {}

  async getUserByUsername(username: string) {
    return this.usersRepository.getUserByUsername(username);
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {}

  async deleteUser(id: string) {}
}
