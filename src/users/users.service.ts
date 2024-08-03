import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  public findAll(): Promise<GetUserDto[]> {
    return this.usersRepository.find().then((users) => {
      return users.map((user) => {
        return GetUserDto.fromUser(user);
      });
    });
  }

  public findOne(id: number): Promise<GetUserDto | null> {
    return this.usersRepository.findOneBy({ id }).then((user) => {
      if (user) {
        return GetUserDto.fromUser(user);
      }
      return null;
    });
  }

  public async remove(id: number): Promise<void> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException();
    }
    await this.usersRepository.delete(user);
  }

  public create(createUserDto: CreateUserDto): Promise<GetUserDto> {
    const user = new User();
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    user.email = createUserDto.email;
    return this.usersRepository.save(user).then((user) => {
      return GetUserDto.fromUser(user);
    });
  }
}
