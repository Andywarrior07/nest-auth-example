import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { DatabaseModule } from './database/database.module';
import { IamModule } from './iam/iam.module';

@Module({
  imports: [ConfigurationModule, DatabaseModule, UsersModule, IamModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
