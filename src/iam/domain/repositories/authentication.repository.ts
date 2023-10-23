import { User } from '@/users/infrastructure/schemas/user.schema';
import { SignInDto } from '../dtos/signIn.dto';
import { SignUpData } from '../interfaces/authentication.interface';

export abstract class AuthenticationRepository {
  abstract signUp(signUpData: SignUpData): Promise<User>;
  abstract getUserByEmail(email: string): Promise<User>;
}
