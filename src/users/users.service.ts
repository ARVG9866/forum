import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user-dto';
import { AddRoleDto } from './dto/add-role-dto';
import { RolesService } from 'src/roles/roles.service';
import * as bcrypt from 'bcryptjs'
import { BanUserDto } from './dto/ban-user-dto';
import { FilesService } from 'src/files/files.service';
import { SetRatingUserDto } from './dto/set-rating-dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User,
              private roleService: RolesService,
              private fileServise: FilesService) {}

  async createUser(dto: CreateUserDto) {
    const fileName = process.env.CUSTOM_AVATAR;
    const user = await this.userRepository.create({...dto, image: fileName});
    const role = await this.roleService.getRoleByValue('user');
    
    await user.$set('roles', [role.id]);
    user.roles = [role];

    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({include: {all: true}});

    return users;
  }

  async getUser(id: number) {
    const user = await this.userRepository.findOne({ where:{ id }, include:{ all:true } })
    if (user)
      return user;

    throw new HttpException("Пользователь не найден", HttpStatus.NOT_FOUND) 
  }

  async getUserByLogin(login: string) {
    const user = await this.userRepository.findOne({ where: {login}, include: {all: true}})
    
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: {email}, include: {all: true}})

    return user;
  }

  async updateUser(dto: CreateUserDto, userId: number) {
    const hashPassword = await bcrypt.hash(dto.password, 5);
    const updated = await this.userRepository.update({...dto, password: hashPassword}, {where: {id: userId}});
    const user = await this.getUser(userId)

    return user;
  }

  async removeUser(id: number) {
    const user = await this.getUser(id)
    
    await user.destroy()
  
    return 'success';
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);

    if (user && role) {
      await user.$add('role', role.id);
      return dto;
    }
    throw new HttpException("Пользователь или роль не найдены", HttpStatus.NOT_FOUND)
  }

  async pickUpTheRole(dto: AddRoleDto) {
    const user = await this.getUser(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);

    if (user && role) {
      await user.$remove('role', role.id);
      return '[ "OK" ]';
    }
  }

  async addBan(dto: BanUserDto) {
    const user = await this.getUser(dto.userId);
    
    user.banned = true;
    user.banReason = dto.banReason;
    user.save()
    // изменить роль на забанен!
    return user;
  }

  async removeBan(dto: BanUserDto) {
    const user = await this.getUser(dto.userId);

    user.banned = false;
    user.banReason = '';
    user.save();
    // вернуть роль - юзер
    return user;
  }

  async setRating(dto: SetRatingUserDto) {
    const user = await this.getUser(dto.userId);
    
    user.rating += dto.rating;
    user.save()
    
    return user;
  }
}
