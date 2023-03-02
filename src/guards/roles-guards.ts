import { CanActivate, ExecutionContext,  Injectable, UnauthorizedException, HttpException, HttpStatus } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt/dist';
import { Reflector } from "@nestjs/core"
import { Observable } from 'rxjs'
import { ROLES_KEY } from "./roles-decorator";

@Injectable()
export class RolesGuards implements CanActivate {
  constructor(private jwtService: JwtService,
              private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRolesLevel = this.reflector.getAllAndOverride<number>(ROLES_KEY, [
        context.getHandler(),
        context.getClass()
    ])

    if (!requiredRolesLevel)
    return true;

    const req = context.switchToHttp().getRequest();
    const authHandler = req.headers.authorization;
    const bearer = authHandler.split(' ')[0];
    const token = authHandler.split(' ')[1];

    if (bearer != "Bearer" || !token) {
      throw new UnauthorizedException({message: 'Пользователь не авторизован'})
    }

    const user = this.jwtService.verify(token);
    req.user = user;

    return user.roles.some(role => role.level >= requiredRolesLevel)
    } 
    catch(e) {
      throw new HttpException("Нет доступа", HttpStatus.FORBIDDEN)
    }
  }
}