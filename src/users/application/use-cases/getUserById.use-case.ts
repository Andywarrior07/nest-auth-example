import { UsersService } from '@/users/domain/services/users.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetUserByIdUseCase {
  constructor(private readonly usersService: UsersService) {}

  async execute(id: string) {
    return this.usersService.getUserById(id);
  }
}
