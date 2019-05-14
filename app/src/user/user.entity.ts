import {
  Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Column, BeforeInsert, OneToMany,
} from 'typeorm'
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UserRO } from './user.dto'
import { IdeaEntity } from '../idea/idea.entity'

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created: Date;

  @Column({
    type: 'text',
    unique: true,
  })
  username: string;

  @Column('text')
  password: string;

  @OneToMany(type => IdeaEntity, idea => idea.author)  // 1 User có nhiều i
  ideas: IdeaEntity[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  toResponseObject(showToken: boolean = true): UserRO {
    const { id, created, username, password, token } = this;
    if (showToken) {
      return { id, created, username, token };
    }
    if (this.ideas) {
      return { id, created, username, token, ideas: this.ideas };
    }
    return { id, created, username };
  }
  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }
  private get token() {
    const { id, username } = this;
    return jwt.sign({
      id,
      username,
    },
    process.env.SECRET,
      {expiresIn: '7d'});
  }
}