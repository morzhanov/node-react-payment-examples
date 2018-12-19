// @flow

import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import BaseEntity from '../entities/base.enetity';
import { LinkType } from '../constants';

@Entity()
class Link extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('integer')
  type: LinkType;

  @Column('text')
  value: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default Link;
