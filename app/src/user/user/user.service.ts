import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user.entity';
import { Repository } from 'typeorm';
import { UserDto, UserRO } from '../user.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity> ) {}
  async showAll() {
    const users = await this.userRepository.find({relations: ['ideas']});
    return users.map(user => user.toResponseObject(false));
   // return await this.userRepository.find({relations: ['ideas']});
  }
  async login(data: UserDto): Promise<UserRO> {
    const { username, password } = data;
    const user = await this.userRepository.findOne({where: {username}});
    if (!user || !(await user.comparePassword(password))) {
      throw new HttpException(
        'Sai TK/MK', HttpStatus.BAD_REQUEST,
      );
    }
    return user.toResponseObject();
  }
  async register(data: UserDto): Promise<UserRO> {
    const { username } = data;
    let user = await this.userRepository.findOne({where: {username}});
    if (user) {
      throw new HttpException('Tai khoan da ton tai', HttpStatus.BAD_REQUEST);
    }
    user = await this.userRepository.create(data);
    await this.userRepository.save(user);
    return user.toResponseObject();
  }
  // async create(data) {
  //   const user = await this.userRepository.create(data);
  //   await this.userRepository.save(user);
  //   return user;
  // }
}
