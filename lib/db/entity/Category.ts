import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Tip } from "./Tip";

@Entity({ name: "categories" })
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ name: "nice_name" })
  niceName!: string;

  @Column("text")
  description!: string;

  @Column("boolean", { default: false })
  hidden!: boolean;

  @OneToMany(() => Tip, (tip) => tip.category) // note: we will create author property in the tip class below
  tips!: Tip[];

  @CreateDateColumn({ name: "created_at" })
  createdAt!: string;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: string;
}
