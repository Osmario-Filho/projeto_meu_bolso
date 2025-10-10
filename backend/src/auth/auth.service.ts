import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { Repository } from 'typeorm';
import { User } from 'src/database/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { HashingServiceProtocol } from './hashing/hashing.service';
import jwtConfig from './config/jwt.config';
import type { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashingServiceProtocol: HashingServiceProtocol,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly jwtService: JwtService,
  ) {}

  async login(LoginDto: LoginDto) {
    let passwordIsValid = false;
    let throwError = true;

    const user = await this.userRepository.findOneBy({
      email: LoginDto.email,
    });

    if (user) {
      passwordIsValid = await this.hashingServiceProtocol.compare(
        LoginDto.password,
        user.passwordHash,
      );
    }

    if (passwordIsValid) {
      throwError = false;
    }

    if (throwError || !user) {
      throw new UnauthorizedException('Usuário ou senha inválidos');
    }

    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.jwtTtl,
      },
    );

    return {
      accessToken,
    };
  }
}
