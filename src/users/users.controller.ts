import { Body, Controller, Delete, Post, Put, Get } from '@nestjs/common';
import { Param, UploadedFile, UseInterceptors, UsePipes } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { AddRoleDto } from './dto/add-role-dto';
import { BanUserDto } from './dto/ban-user-dto';
import { CreateUserDto } from './dto/create-user-dto';
import { SetRatingUserDto } from './dto/set-rating-dto';
import { User } from './users.model';
import { UsersService } from './users.service';


@ApiTags('Пользователи')
@UsePipes(ValidationPipe)
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: 'Создать пользователя' })
  @ApiResponse({ status: 200, type: User })
  @Post('/create')
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Получить всех пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  @Get('/getAll')
  getAll() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'Получить пользователя' })
  @ApiResponse({ status: 200, type: User })
  @Get('/get/:id')
  getUser(@Param('id') id: number) {
    return this.userService.getUser(id);
  }

  @ApiOperation({ summary: 'Получить пользователя по логин' })
  @ApiResponse({ status: 200, type: User })
  @Get('/getByLogin/:login')
  getbyLogin(@Param('login') login: string) {
    return this.userService.getUserByLogin(login);
  }

  @ApiOperation({ summary: 'Получить пользователя по емаил' })
  @ApiResponse({ status: 200, type: User })
  @Get('/getByEmail/:email')
  getByEmail(@Param('email') email: string) {
    return this.userService.getUserByEmail(email);
  }

  @ApiOperation({ summary: 'Изменить пользователя' })
  @ApiResponse({ status: 200, type: User })
  @Put('/update/:id')
  update(@Body() userDto: CreateUserDto, @Param('id') id: number) {
    return this.userService.updateUser(userDto, id);
  }

  @ApiOperation({ summary: 'Удалить пользователя' })
  @ApiResponse({ status: 200, type: User })
  @Delete('/delete/:id')
  delete(@Param('id') id: number) {
    return this.userService.removeUser(id);
  }

  @ApiOperation({ summary: 'Добавить пользователю роль' })
  @ApiResponse({ status: 200})
  @Post('/addRole')
  addRole(@Body() dto: AddRoleDto) {
    return this.userService.addRole(dto);
  }

  @ApiOperation({ summary: 'Удалить роль' })
  @ApiResponse({ status: 200})
  @Delete('/removeRole')
  removeRole(@Body() dto: AddRoleDto) {
    return this.userService.pickUpTheRole(dto);
  }

  @ApiOperation({ summary: 'Забанить пользователя' })
  @ApiResponse({ status: 200})
  @Post('/ban')
  ban(@Body() dto: BanUserDto) {
    return this.userService.addBan(dto);
  }

  @ApiOperation({ summary: 'Разбанить пользователя' })
  @ApiResponse({ status: 200})
  @Post('/unban')
  unban(@Body() dto: BanUserDto) {
    return this.userService.removeBan(dto);
  }

  @ApiOperation({ summary: 'Изменить рейтинг пользователя' })
  @ApiResponse({ status: 200})
  @Post('/rating')
  setRating(@Body() dto: SetRatingUserDto) {
    return this.userService.setRating(dto);
  }
}
