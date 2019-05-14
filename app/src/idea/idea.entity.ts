import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne
} from 'typeorm';
import { UserEntity } from '../user/user.entity'

@Entity('idea')
export class IdeaEntity{
    @PrimaryGeneratedColumn('uuid') id: string;

    @CreateDateColumn() created: Date;
    @Column('text') idea: string;

    @Column('text') description: string;

    @ManyToOne(type => UserEntity, author => author.ideas)  // nhiều idea
      // thuộc 1 user
    author: UserEntity;
}