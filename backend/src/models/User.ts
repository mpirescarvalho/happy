import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import bcrypt from 'bcryptjs';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  async checkPassword(password: string) {
    return bcrypt.compare(password, this.password);
  }
}
