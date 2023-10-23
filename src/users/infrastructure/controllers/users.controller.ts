import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Auth } from '@/iam/application/decorators/auth.decorator';
import { AuthType } from '@/iam/domain/enums/auth-type.enum';
import { CreateUserDto } from '@/users/domain/dtos/createUser.dto';
import { CreateUserUseCase } from '@/users/application/use-cases/createUser.use-case';
import { DeleteUserUseCase } from '@/users/application/use-cases/deleteUser.use-case';
import { GetUserByIdUseCase } from '@/users/application/use-cases/getUserById.use-case';
import { GetUserByUsernameUseCase } from '@/users/application/use-cases/getUserByUsername.use-case';
import { GetUsersUseCase } from '@/users/application/use-cases/getUsers.use-case';
import { UpdateUserDto } from '@/users/domain/dtos/updateUser.dto';
import { UpdateUserUseCase } from '@/users/application/use-cases/updateUser.use-case';

@Auth(AuthType.Bearer)
@Controller('users')
export class UsersController {
  constructor(
    private readonly getUsersUseCase: GetUsersUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly getUserByUsernameUseCase: GetUserByUsernameUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Get('/')
  async getUsers() {
    return this.getUsersUseCase.execute();
  }

  @Get('/:id')
  async getUserById(@Param('id') id: string) {
    return this.getUserByIdUseCase.execute(id);
  }

  @Get('/username/:username')
  async getUserByUsername(@Param('username') username: string) {
    return this.getUserByUsernameUseCase.execute(username);
  }

  //! se debe utilizar solo cuando el admin crea un usuario
  @Post('/')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.createUserUseCase.execute(createUserDto);
  }

  @Put('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.updateUserUseCase.execute(id, updateUserDto);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    return this.deleteUserUseCase.execute(id);
  }
}
