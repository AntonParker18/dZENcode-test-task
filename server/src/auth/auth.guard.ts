import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    const authHeader = request.headers.authorization

    if (!authHeader) {
      throw new UnauthorizedException({ message: 'User is not authorized' })
    }

    const [bearer, token] = authHeader.split(' ')

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException({ message: 'User is not authorized' })
    }

    try {
      const user = this.jwtService.verify(token)
      request.user = user
      return true
    } catch (e) {
      throw new UnauthorizedException({ message: 'User is not authorized' })
    }
  }
}
