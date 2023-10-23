import { Comment } from 'src/comment/comment.entity'
import { Token } from '../auth/token.entity'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  userName: string

  @Column({ unique: true })
  email: string

  @Column({ nullable: true })
  photo: string

  @Column()
  password: string

  @Column({ default: false })
  captcha: boolean

  @Column({ nullable: true })
  homePage: string

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[]

  @OneToMany(() => Token, (token) => token.user)
  tokens: Token[]
}
