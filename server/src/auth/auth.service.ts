import {
  Injectable,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from '../user/user.service'
import { CreateUserDto } from 'src/user/dto/create-user.dto'
import { User } from 'src/user/user.entity'
import { Token } from './token.entity'
import * as bcrypt from 'bcryptjs'
import * as svgCaptcha from 'svg-captcha'
import { InjectRepository } from '@nestjs/typeorm'
import { LessThanOrEqual, Repository } from 'typeorm'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email)
    if (user && (await bcrypt.compare(password, user.password))) {
      return user
    }
    throw new UnauthorizedException({ message: 'Incorrect email or password' })
  }

  async login(userDto: CreateUserDto, captcha: string) {
    const user = await this.validateUser(userDto.email, userDto.password)
    await this.removeInvalidTokens(user.email)
    const isValidCaptcha = this.verifyCaptcha(captcha)
    if (isValidCaptcha) {
      await this.userService.changeUserCaptchaStatus(user.email)
    } else if (!user.captcha) {
      throw new UnauthorizedException({ message: 'CAPTCHA validation failed' })
    }

    const token = await this.generateToken(user)

    const expirationDate = new Date()
    expirationDate.setHours(expirationDate.getHours() + 24 * 7)

    await this.saveToken(user.id, token.token, expirationDate)
    return token
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email)
    if (candidate) {
      throw new HttpException(
        'A user with this email already exists',
        HttpStatus.BAD_REQUEST,
      )
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5)
    const user = await this.userService.create({
      ...userDto,
      password: hashPassword,
    })
    return this.generateToken(user)
  }

  async logout(token: string) {
    const tokenEntity = await this.tokenRepository.findOne({ where: { token } })

    if (tokenEntity) {
      await this.tokenRepository.remove(tokenEntity)
    }
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, userName: user.userName }
    return {
      token: this.jwtService.sign(payload),
    }
  }

  async saveToken(
    userId: number,
    token: string,
    expiration: Date,
  ): Promise<void> {
    const user = await this.userService.getUserById(userId)

    if (user) {
      const newToken = new Token()
      newToken.user = user
      newToken.token = token
      newToken.expiration = expiration
      await this.tokenRepository.save(newToken)
    }
  }

  async removeInvalidTokens(email: string) {
    const user = await this.userService.getUserByEmail(email)
    if (user) {
      const tokens = await this.tokenRepository.find({
        where: {
          user,
          expiration: LessThanOrEqual(new Date()),
        },
      })

      for (const token of tokens) {
        await this.tokenRepository.remove(token)
      }
    }
  }

  private captchas = new Map<string, string>()

  createCaptcha(): { data: string; text: string } {
    const captcha = svgCaptcha.create({ color: true, background: 'cc9966' })
    const id = captcha.text
    this.captchas.set(id, captcha.text)
    return { data: captcha.data, text: id }
  }

  verifyCaptcha(captcha: string): boolean {
    const id = captcha
    const storedCaptcha = this.captchas.get(id)
    if (storedCaptcha) {
      this.captchas.delete(id)
      return storedCaptcha === captcha
    }
    return false
  }
}
