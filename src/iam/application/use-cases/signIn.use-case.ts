import { SignInDto } from '@/iam/domain/dtos/signIn.dto';
import { AuthenticationService } from '@/iam/domain/services/authentication.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SignInUseCase {
  constructor(private readonly service: AuthenticationService) {}

  async execute(signInDto: SignInDto) {
    return this.service.signIn(signInDto);
  }
}
