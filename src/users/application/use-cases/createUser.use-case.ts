import { Injectable } from '@nestjs/common';
import { UsersService } from '@/users/domain/services/users.service';
import { CreateUserDto } from '../../domain/dtos/createUser.dto';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly usersService: UsersService) {}

  async execute(createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }
}
