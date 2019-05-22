import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IdeaEntity } from '../idea.entity';
import { IdeaDTO, IdeaRO } from '../idea.dto';
import { UserEntity } from '../../user/user.entity';

@Injectable()
export class IdeaService {
  constructor(@InjectRepository(IdeaEntity) private ideaRepository: Repository<IdeaEntity>,
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {}

  private toResponseObject(idea: IdeaEntity): IdeaRO {
    return {...idea, author: idea.author.toResponseObject(false)};
  }

  async showAll() {
     return await this.ideaRepository.find({relations: ['author'],
      //  take: 25,
      // skip: 25 * (page - 1),
      // order: newest && { created: 'DESC' },    Phân trang
     } );
    // const ideas = await this.ideaRepository.find({relations: ['author']});
    // return ideas.map(idea => this.toResponseObject(idea));
    //return await this.ideaRepository.find({relations: ['author']});
  }

  async create(userId: string, data: IdeaDTO): Promise<IdeaRO> {
    const user = await this.userRepository.findOne({where: { id : userId}});
    const idea = await this.ideaRepository.create({...data, author: user});
    await this.ideaRepository.save(idea);
    return this.toResponseObject(idea);
  }

  async read(id: string) : Promise<IdeaRO>{
    const idea = await this.ideaRepository.findOne({ where: {id}, relations: ['author'] });
    if (!idea) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return this.toResponseObject(idea);
  }

  private ensureOwnership(idea: IdeaEntity, userId: string) {
    Logger.log(idea,'1111');
    Logger.log(userId,'2222');

    if (idea.author.id !== userId) {
      throw new HttpException('Incorrect User', HttpStatus.UNAUTHORIZED);
    }
  }
  async update(
    id: string,
    userId: string,
    data: Partial<IdeaDTO>,
  ): Promise<IdeaRO> {
    let idea = await this.ideaRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    if (!idea) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    this.ensureOwnership(idea, userId);
    await this.ideaRepository.update({ id }, data);
    idea = await this.ideaRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    return this.toResponseObject(idea);
  }

  async destroy(id: string, userId: string) {
    const idea = await this.ideaRepository.findOne({ where: {id} });
    if (!idea) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    }
    await this.ideaRepository.delete({id});
    return idea;
  }

}
