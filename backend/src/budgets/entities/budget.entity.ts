import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User, Category } from '../../database/entities';

@Entity({ name: 'budgets' })
export class Budget {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column()
  month: number; // 1-12

  @Column()
  year: number; // Exemplo: 2023

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.budgets, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Category, (category) => category.budgets, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  category: Category;
}
