import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationController } from './infrastructure/controllers/authentication.controller';
import { AuthenticationDatasource } from './domain/datasources/authentication.datasource';
import { AuthenticationDatasourceImpl } from './infrastructure/datasources/authenticationImp.datasource';
import { AuthenticationRepository } from './domain/repositories/authentication.repository';
import { AuthenticationRepositoryImpl } from './infrastructure/repositories/authenticationImp.repository';
import { AuthenticationService } from './domain/services/authentication.service';
import { BcryptService } from './domain/services/bcrypt.service';
import { HashingService } from './domain/services/hashing.service';
import { SignInUseCase } from './application/use-cases/signIn.use-case';
import { SignUpUseCase } from './application/use-cases/signUp.use-case';
import { User, UserSchema } from '@/users/infrastructure/schemas/user.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationGuard } from './application/guards/authentication.guard';
import { AccessTokenGuard } from './application/guards/accessToken.guard';

@Module({
  controllers: [AuthenticationController],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_ACCESS_TOKEN_TTL'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    ConfigService,
    JwtService,
    SignInUseCase,
    SignUpUseCase,
    AuthenticationService,
    AccessTokenGuard,
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    {
      provide: AuthenticationRepository,
      useClass: AuthenticationRepositoryImpl,
    },
    {
      provide: AuthenticationDatasource.name,
      useClass: AuthenticationDatasourceImpl,
    },
    { provide: HashingService, useClass: BcryptService },
  ],
})
export class IamModule {}
