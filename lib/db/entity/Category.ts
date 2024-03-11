import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

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

  @CreateDateColumn({ name: "created_at" })
  createdAt!: string;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: string;
}
