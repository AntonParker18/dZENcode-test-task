import { Controller, Post, Body, Get, UseGuards, Req, Param } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { JwtAuthGuard } from 'src/auth/auth.guard'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getUser(@Req() req) {
    return this.userService.getUserById(req.user.id)
  }
}
