import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { AuthenticationRepository } from '../repositories/authentication.repository';
import { HashingService } from './hashing.service';
import { SignInDto } from '../dtos/signIn.dto';
import { SignUpDto } from '../dtos/signUp.dto';
import { User } from '@/users/infrastructure/schemas/user.schema';
import { ActiveUserData } from '../interfaces/authentication.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    private readonly authenticationRepository: AuthenticationRepository,
    private readonly configService: ConfigService,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    this.logger.log('Init signUp process.', this.signUp.name);
    // TODO: Validar que no exista el username en el front
    try {
      return this.authenticationRepository.signUp({
        ...signUpDto,
        password: await this.hashingService.hash(signUpDto.password),
      });
    } catch (err) {
      this.logger.error(err, this.signUp.name);
      if (err && err.code === 11000) {
        throw new ConflictException('Email already exists');
      }

      throw new InternalServerErrorException(err);
    }
  }

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;
    const user = await this.authenticationRepository.getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('User or password incorrect');
    }

    const isEqual = await this.hashingService.compare(password, user.password);

    if (!isEqual) {
      throw new ConflictException('Email or password incorrect');
    }

    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const refreshTokenId = randomUUID();
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken<Partial<ActiveUserData>>(
        user._id.toString(),
        Number(this.configService.get('JWT_ACCESS_TOKEN_TTL')),
        { email: user.email },
      ),
      this.signToken(
        user._id,
        Number(this.configService.get('JWT_REFRESH_TOKEN_TTL')),
        {
          refreshTokenId,
        },
      ),
    ]);

    //! Ver para que era esto await this.refreshTokenStorage.insert(user._id, refreshTokenId);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async signToken<T>(_id: string, expiresIn: number, payload?: T) {
    return this.jwtService.signAsync(
      {
        sub: _id,
        ...payload,
      },
      {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: expiresIn,
      },
    );
  }
}
