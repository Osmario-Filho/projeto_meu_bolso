import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  Scope,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { HashingServiceProtocol } from '../auth/hashing/hashing.service';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';
import { NotFoundError } from 'rxjs';

@Injectable({ scope: Scope.DEFAULT })
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashingService: HashingServiceProtocol,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }
    const passwordHash = await this.hashingService.hash(createUserDto.password);
    const newUser = this.userRepository.create({
      ...createUserDto,
      passwordHash,
    });
    return await this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string) {
    const findedUser = await this.userRepository.findOneBy({ id });
    if (!findedUser) {
      throw new NotFoundException(`Usuário com o ID "${id}" não encontrado.`);
    }
    return findedUser;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    tokenPayload: TokenPayloadDto,
  ) {
    const dadosPessoa = {
      nome: updateUserDto?.name,
    };
    if (updateUserDto?.password) {
      const passwordHash = await this.hashingService.hash(
        updateUserDto.password,
      );
      dadosPessoa['passwordHash'] = passwordHash;
    }
    const findedUser = await this.userRepository.preload({
      id,
      ...dadosPessoa,
    });
    if (!findedUser) {
      throw new NotFoundException('User not found');
    }
    if (findedUser.id !== tokenPayload.sub) {
      throw new ForbiddenException('Você não é essa pessoa');
    }
    return await this.userRepository.save(findedUser);
  }

  async remove(id: string, tokenPayload: TokenPayloadDto) {
    const user = await this.findOne(id);

    if (user.id !== tokenPayload.sub) {
      throw new ForbiddenException('Você não é essa pessoa');
    }
    return this.userRepository.remove(user);
  }
}
