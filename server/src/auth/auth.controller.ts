import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateUserDto } from 'src/user/dto/create-user.dto'
import { Request, Response } from 'express'
import { JwtAuthGuard } from './auth.guard'
import { LocalStrategy } from './local.strategy'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('captcha')
  generateCaptcha(@Req() req: Request, @Res() res: Response) {
    const captcha = this.authService.createCaptcha()
    res.set('Content-Type', 'image/svg+xml')
    res.send(captcha.data)
  }

  @UseGuards(LocalStrategy)
  @Post('/login')
  login(@Body() userDto: CreateUserDto, @Req() req: Request) {
    return this.authService.login(userDto, req.body.captcha)
  }

  @Post('/registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto)
  }

  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  logout(@Body('token') token: string) {
    return this.authService.logout(token)
  }
}
