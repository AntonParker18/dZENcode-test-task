import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateCommentDto } from './dto/create-comment.dto'
import { Comment } from './comment.entity'
import * as DOMPurify from 'dompurify'
import * as xss from 'xss';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async create(createCommentDto: CreateCommentDto, userId: number) {
    // createCommentDto.text = this.sanitizeHtml(createCommentDto.text)

    const comment = this.commentRepository.create({
      user: { id: userId },
      text: createCommentDto.text,
    })
    return await this.commentRepository.save(comment)
  }

  async deleteComment(commentId: number, userId: number) {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId, user: { id: userId } },
    })

    if (!comment) {
      throw new Error('Comment not found or does not belong to the user')
    }

    await this.commentRepository.remove(comment)
  }

  async createResponse(
    parentCommentId: number,
    createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    const comment = this.commentRepository.create({
      ...createCommentDto,
      parentComment: { id: parentCommentId },
    })
    return await this.commentRepository.save(comment)
  }

  async findAll(): Promise<Comment[]> {
    return await this.commentRepository.find({ relations: ['user'] })
  }

  // sanitizeHtml(inputHtml: string): string {
  //   const xssCleaner = new xss.FilterXSS();
  //   const cleanHtml = DOMPurify.sanitize(inputHtml, { ALLOWED_TAGS: ['a', 'code', 'i', 'strong'] });
  //   const validatedHtml = xssCleaner.process(cleanHtml);

  //   return validatedHtml;
  // }
}
