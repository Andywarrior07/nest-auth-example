import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateUserUseCase } from './application/use-cases/createUser.use-case';
import { DeleteUserUseCase } from './application/use-cases/deleteUser.use-case';
import { GetUserByIdUseCase } from './application/use-cases/getUserById.use-case';
import { GetUserByUsernameUseCase } from './application/use-cases/getUserByUsername.use-case';
import { GetUsersUseCase } from './application/use-cases/getUsers.use-case';
import { UpdateUserUseCase } from './application/use-cases/updateUser.use-case';
import { User, UserSchema } from './infrastructure/schemas/user.schema';
import { UsersController } from './infrastructure/controllers/users.controller';
import { UsersDatasource } from './domain/datasources/users.datasource';
import { UsersDatasourceImpl } from './infrastructure/datasources/users.datasource';
import { UsersRepository } from './domain/repositories/users.repository';
import { UsersRepositoryImpl } from './infrastructure/repositories/users.repository';
import { UsersService } from './domain/services/users.service';

@Module({
  controllers: [UsersController],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    CreateUserUseCase,
    DeleteUserUseCase,
    GetUserByIdUseCase,
    GetUserByUsernameUseCase,
    GetUsersUseCase,
    UpdateUserUseCase,
    UsersRepositoryImpl,
    UsersService,
    {
      provide: UsersRepository,
      useClass: UsersRepositoryImpl,
    },
    {
      provide: UsersDatasource.name,
      useClass: UsersDatasourceImpl,
    },
  ],
})
export class UsersModule {}
