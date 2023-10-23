import { UsersService } from '@/users/domain/services/users.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetUserByUsernameUseCase {
  constructor(private readonly usersService: UsersService) {}

  async execute(username: string) {
    return this.usersService.getUserByUsername(username);
  }
}
