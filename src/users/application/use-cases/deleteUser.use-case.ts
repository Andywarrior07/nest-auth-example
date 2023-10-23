import { UsersService } from '@/users/domain/services/users.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteUserUseCase {
  constructor(private readonly usersService: UsersService) {}

  async execute(id: string) {
    return this.usersService.deleteUser(id);
  }
}
