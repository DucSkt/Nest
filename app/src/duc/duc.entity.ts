import { CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('duc')
export class DucEntity {
   @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created: Date;

  @CreateDateColumn()
  updated: Date;

}