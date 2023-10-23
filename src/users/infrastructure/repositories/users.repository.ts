import { Inject, Injectable } from '@nestjs/common';
import { UsersRepository } from '@/users/domain/repositories/users.repository';
import { UsersDatasource } from '@/users/domain/datasources/users.datasource';
import { CreateUserDto } from '@/users/domain/dtos/createUser.dto';
import { UpdateUserDto } from '@/users/domain/dtos/updateUser.dto';
import { User } from '../schemas/user.schema';
import { SignUpDto } from '@/iam/domain/dtos/signUp.dto';

@Injectable()
export class UsersRepositoryImpl implements UsersRepository {
  constructor(
    @Inject(UsersDatasource.name) private readonly datasource: UsersDatasource,
  ) {}

  async createUser(createUserDto: CreateUserDto | SignUpDto): Promise<User> {
    return this.datasource.createUser(createUserDto);
  }

  async getUsers(): Promise<User[]> {
    return this.datasource.getUsers();
  }

  async getUserById(id: string): Promise<User> {
    return this.datasource.getUserById(id);
  }

  async getUserByUsername(username: string): Promise<User> {
    return this.datasource.getUserByUsername(username);
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.datasource.getUserByEmail(email);
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.datasource.updateUser(id, updateUserDto);
  }

  async deleteUser(id: string): Promise<void> {
    return this.datasource.deleteUser(id);
  }
}
