import { ApiProperty } from "@nestjs/swagger/dist/decorators";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ example: 'ARVG', description: 'Логин'})
  @IsString({ message: 'Должно быть строкой' })
  readonly login: string;

  @ApiProperty({ example: '12345', description: 'Пароль'})
  @IsString({ message: 'Должно быть строкой' })
  @Length(4, 16, {message: 'Длина пароля от 4 до 16 символов'})
  readonly password: string;

  @ApiProperty({ example: 'Джеки', description: 'Имя пользователя'})
  @IsString({ message: 'Должно быть строкой' })
  readonly userName: string;

  @ApiProperty({ example: 'asd@gmail.com', description: 'Почта'})
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string;
}
