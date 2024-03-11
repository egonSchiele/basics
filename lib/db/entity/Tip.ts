import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Category } from "./Category";

@Entity({ name: "tips" })
export class Tip {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column("text")
  text!: string;

  @ManyToOne(() => Category, (category) => category.id)
  @JoinColumn({ name: "category_id" })
  category!: Category;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: string;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: string;
}
