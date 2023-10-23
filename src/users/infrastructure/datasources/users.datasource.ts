import { Injectable } from '@nestjs/common';
import { UsersDatasource } from '@/users/domain/datasources/users.datasource';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from '@/users/domain/dtos/createUser.dto';
import { UpdateUserDto } from '@/users/domain/dtos/updateUser.dto';
import { SignUpDto } from '@/iam/domain/dtos/signUp.dto';

@Injectable()
export class UsersDatasourceImpl implements UsersDatasource {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(createUserDto: CreateUserDto | SignUpDto): Promise<User> {
    throw new Error('Method not implemented.');
  }

  async getUsers(): Promise<User[]> {
    return this.userModel.find().select('-password').lean();
  }

  async getUserById(id: string): Promise<User> {
    throw new Error('Method not implemented.');
  }

  async getUserByUsername(username: string): Promise<User> {
    return this.userModel.find({ username }).select('-password').lean();
  }

  async getUserByEmail(email: string): Promise<User> {
    throw new Error('Method not implemented.');
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    throw new Error('Method not implemented.');
  }

  async deleteUser(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
