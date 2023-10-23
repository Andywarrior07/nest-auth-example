import { Injectable } from '@nestjs/common';
import { SignUpDto } from '@/iam/domain/dtos/signUp.dto';
import { AuthenticationService } from '@/iam/domain/services/authentication.service';

@Injectable()
export class SignUpUseCase {
  constructor(private readonly service: AuthenticationService) {}

  async execute(signUpDto: SignUpDto) {
    const {password, ...user} = await this.service.signUp(signUpDto);
    
    return user;
  }
}
