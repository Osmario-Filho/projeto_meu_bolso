import { ConflictException, Injectable, Scope } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { HashingServiceProtocol } from '../auth/hashing/hashing.service';

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

  async findOne(email: string) {
    const findedUser = await this.userRepository.findOneBy({ email });
    if (!findedUser) {
      throw new Error('User not found');
    }
    return findedUser;
  }

  async update(email: string, updateUserDto: UpdateUserDto) {
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
      email,
      ...dadosPessoa,
    });
    if (!findedUser) {
      throw new Error('User not found');
    }

    return await this.userRepository.save(findedUser);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
