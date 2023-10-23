import { UsersService } from '@/users/domain/services/users.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetUsersUseCase {
  constructor(private readonly usersService: UsersService) {}

  async execute() {
    return this.usersService.getUsers();
  }
}
