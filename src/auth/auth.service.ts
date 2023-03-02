import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthUserDto } from 'src/users/dto/auth-user-dto';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
import { HttpException, UnauthorizedException } from '@nestjs/common/exceptions';
import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { HttpStatus } from '@nestjs/common/enums';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService,
              private jwtService: JwtService) {}


  async registration(dto: CreateUserDto) {
      // # if found login, than error = user is exist
      const login = await this.userService.getUserByLogin(dto.login);

      if (login) {
        throw new HttpException('Такой пользователь уже существует', HttpStatus.BAD_REQUEST)
      }

      const email = await this.userService.getUserByEmail(dto.email);

      if (email) {
        throw new HttpException('Такой email уже используется', 430)
      }
      const hashPassword = await bcrypt.hash(dto.password, 5)
      const user = await this.userService.createUser({...dto, password: hashPassword})

      return this.generateToken(user);
  }

  async login(dto: AuthUserDto) {
    const user = await this.validateUser(dto);
    
    return await this.generateToken(user);
  }

  private async validateUser(dto: AuthUserDto) {
    const user = await this.userService.getUserByLogin(dto.login);
    const password = user ? user.password: '';
    
    const passwordEquals = await bcrypt.compare(dto.password, user.password);
    
    if (passwordEquals) {
      return user;
    }

    throw new UnauthorizedException({message: 'Неправильный пароль'})     
  }

  private async generateToken(user: User) {
    const payload = {email: user.email, id: user.id, roles: user.roles};
    
    return {
        token: this.jwtService.sign(payload)
    }
  }
}
