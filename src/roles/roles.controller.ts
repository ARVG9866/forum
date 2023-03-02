import { Controller, Post, Get, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { UsePipes } from '@nestjs/common/decorators';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { Roles } from 'src/guards/roles-decorator';
import { RolesGuards } from 'src/guards/roles-guards';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { CreateRoleDto } from './dto/create-role-dto';
import { Role } from './roles.model';
import { RolesService } from './roles.service';

@ApiTags('Роли')
@UseGuards(RolesGuards)
@UsePipes(ValidationPipe)
@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  @ApiOperation({ summary: 'Создать Роль' })
  @ApiResponse({ status: 200, type: Role })
  @Post('/create')
  @Roles(99)
  create(@Body() roleDto: CreateRoleDto) {
    return this.roleService.createRole(roleDto);
  }

  @ApiOperation({ summary: 'Получить все роли' })
  @ApiResponse({ status: 200, type: [Role] })
  @Get('/get/all')
  getAll() {
    return this.roleService.getAllRoles();
  }

  @ApiOperation({ summary: 'Получить роль' })
  @ApiResponse({ status:200, type: Role })
  @Get('/get/:id')
  getRole(@Param('id') id: number) {
    return this.roleService.getRole(id)
  }

  @ApiOperation({ summary: 'Получить роль по значению' })
  @ApiResponse({ status:200, type: Role })
  @Get('/get/byValue/:value')
  getRoleByValue(@Param('value') value: string) {
    return this.roleService.getRoleByValue(value)
  }

  @ApiOperation({ summary: 'Обновить роль' })
  @ApiResponse({ status:200, type: Role })
  @Put('/update/:id')
  @Roles(99)
  updateRole(@Param('id') id: number, @Body() dto: CreateRoleDto) {
    return this.roleService.updateRole(dto, id)
  }

  @ApiOperation({ summary: 'Удалить роль' })
  @ApiResponse({ status:200, type: Role })
  @Delete('/delete/:id')
  @Roles(99)
  deleteRole(@Param('id') id: number) {
    return this.roleService.removeRole(id)
  }

}
