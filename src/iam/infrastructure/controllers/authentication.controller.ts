import { Body, Controller, Post } from '@nestjs/common';
import { Auth } from '@/iam/application/decorators/auth.decorator';
import { AuthType } from '@/iam/domain/enums/auth-type.enum';
import { SignInDto } from '@/iam/domain/dtos/signIn.dto';
import { SignInUseCase } from '@/iam/application/use-cases/signIn.use-case';
import { SignUpDto } from '@/iam/domain/dtos/signUp.dto';
import { SignUpUseCase } from '@/iam/application/use-cases/signUp.use-case';

@Auth(AuthType.None)
@Controller('iam')
export class AuthenticationController {
  constructor(
    private readonly signInUseCase: SignInUseCase,

    private readonly signUpUseCase: SignUpUseCase,
  ) {}

  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto) {
    return this.signInUseCase.execute(signInDto);
  }

  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.signUpUseCase.execute(signUpDto);
  }
}
