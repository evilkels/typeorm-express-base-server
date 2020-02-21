import { Entity, Column, PrimaryGeneratedColumn, JoinTable, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity("Events")
export class Event {


  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;
  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @ManyToOne(type => User, user => user.events)
  user: User;

}