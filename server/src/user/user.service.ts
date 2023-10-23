import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto) {
    const user = await this.userRepository.save(dto)
    return user
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } })
    return user
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findOne({ where: { id } })
    return user
  }

  async changeUserCaptchaStatus(email: string) {
    const user = await this.getUserByEmail(email)
    user.captcha = true
    await this.userRepository.save(user)
  }
}
