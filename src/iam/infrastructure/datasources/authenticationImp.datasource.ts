import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthenticationDatasource } from '../../domain/datasources/authentication.datasource';
import { User, UserDocument } from '@/users/infrastructure/schemas/user.schema';
import { SignUpData } from '@/iam/domain/interfaces/authentication.interface';

@Injectable()
export class AuthenticationDatasourceImpl extends AuthenticationDatasource {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {
    super();
  }

  async signUp(signUpData: SignUpData): Promise<User> {
    const user = new this.userModel(signUpData);
    return (await user.save()).toObject();
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).lean();
  }
}
