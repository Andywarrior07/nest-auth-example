import { UsersService } from '@/users/domain/services/users.service';
import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../../domain/dtos/updateUser.dto';

@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly usersService: UsersService) {}

  async execute(id: string, updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }
}
