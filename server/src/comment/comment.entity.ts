import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateAdded: Date;

  @ManyToOne(() => User, user => user.comments)
  user: User;

  @ManyToMany(() => Comment, comment => comment.responses)
  @JoinTable()
  responses: Comment[];

  @ManyToOne(() => Comment, comment => comment.responses, { nullable: true })
  @JoinColumn({ name: 'parentCommentId' })
  parentComment: Comment;
}