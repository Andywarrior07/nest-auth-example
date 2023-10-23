import { User } from '@/users/infrastructure/schemas/user.schema';
import { CreateUserDto } from '../dtos/createUser.dto';
import { UpdateUserDto } from '../dtos/updateUser.dto';
import { SignUpDto } from '@/iam/domain/dtos/signUp.dto';

export abstract class UsersRepository {
  abstract createUser(createUserDto: CreateUserDto | SignUpDto): Promise<User>;
  abstract getUsers(): Promise<User[]>;
  abstract getUserById(id: string): Promise<User>;
  abstract getUserByUsername(username: string): Promise<User>;
  abstract getUserByEmail(email: string): Promise<User>;
  abstract updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User>;
  abstract deleteUser(id: string): Promise<void>;
}
