import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HashingServiceProtocol } from './hashing/hashing.service';
import { BcryptService } from './hashing/bcrypt.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entities';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { AuthTokenGuard } from './guards/auth-token.guard';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: HashingServiceProtocol,
      useClass: BcryptService,
    },
    AuthTokenGuard,
  ],
  exports: [HashingServiceProtocol, JwtModule, ConfigModule, AuthService],
})
export class AuthModule {}
