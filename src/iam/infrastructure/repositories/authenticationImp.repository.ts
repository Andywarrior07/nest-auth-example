import { Inject, Injectable } from '@nestjs/common';
import { SignInDto } from '@/iam/domain/dtos/signIn.dto';
import { User } from '@/users/infrastructure/schemas/user.schema';
import { AuthenticationRepository } from '../../domain/repositories/authentication.repository';
import { AuthenticationDatasource } from '../../domain/datasources/authentication.datasource';
import { SignUpData } from '@/iam/domain/interfaces/authentication.interface';

@Injectable()
export class AuthenticationRepositoryImpl extends AuthenticationRepository {
  constructor(
    @Inject(AuthenticationDatasource.name)
    private readonly datasource: AuthenticationDatasource,
  ) {
    super();
  }

  async signUp(signUpData: SignUpData): Promise<User> {
    return this.datasource.signUp(signUpData);
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.datasource.getUserByEmail(email);
  }
}
