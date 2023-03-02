import { ApiProperty } from "@nestjs/swagger/dist/decorators";

export class AuthUserDto {
  @ApiProperty({ example: 'ARVG', description: 'Логин'})
  readonly login: string;

  @ApiProperty({ example: '12345', description: 'Пароль'})
  readonly password: string;
}
