import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/create-role-dto';
import { Role } from './roles.model';

@Injectable()
export class RolesService {
  constructor (@InjectModel(Role) private roleRepository: typeof Role) {}

  async createRole (dto: CreateRoleDto) {
    const role = await this.roleRepository.create(dto);

    return role;
  }

  async getAllRoles() {
    const roles = await this.roleRepository.findAll();

    return roles;
  }

  async getRoleByValue(value: string) {
    const role = await this.roleRepository.findOne({ where: { value } });

    if (role)
      return role;

      throw new HttpException("Не найдена роль", HttpStatus.NOT_FOUND);
  }

  async getRole(id: number) {
    const role = await this.roleRepository.findOne({ where: { id } });

    if (role)
      return role;

      throw new HttpException("Не найдена роль", HttpStatus.NOT_FOUND);
  }

  async updateRole(dto: CreateRoleDto, id: number) {
    const updated = await this.roleRepository.update(dto, {where: {id: id}});
    
    const role = await this.getRole(id);

    return role;
  }

  async removeRole(id: number) {
    const role = await this.getRole(id);
    
    role.destroy()
    
    return '[ "OK" ]';
  }
}
