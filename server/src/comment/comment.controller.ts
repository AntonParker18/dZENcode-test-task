import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Delete,
  Req,
} from '@nestjs/common'
import { CommentService } from './comment.service'
import { CreateCommentDto } from './dto/create-comment.dto'
import { JwtAuthGuard } from 'src/auth/auth.guard'

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createCommentDto: CreateCommentDto, @Req() req) {
    const user = req.user.id
    return this.commentService.create(createCommentDto, user)
  }

  @UseGuards(JwtAuthGuard)
  @Post(':parentCommentId')
  createResponse(
    @Param('parentCommentId') parentCommentId: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentService.createResponse(parentCommentId, createCommentDto)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteComment(@Param('id') id: number, @Req() req) {
    return this.commentService.deleteComment(id, req.user.id)
  }

  @Get()
  findAll() {
    return this.commentService.findAll()
  }
}
