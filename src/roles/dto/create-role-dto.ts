import { ApiProperty } from "@nestjs/swagger/dist/decorators";
import { Min, Max } from "class-validator";
import { IsNumber, IsString } from "class-validator";

export class CreateRoleDto {
  @ApiProperty({ example: 'admin', description:"Значение" })
  @IsString({ message: 'Значечние должно быть строкой' })
  readonly value: string;

  @ApiProperty({ example: '99', description:"Уровень роли пользователя" })
  @IsNumber({}, { message: 'Должно быть числом' })
  @Min(0)
  @Max(99)
  readonly level: number;

  @ApiProperty({ example: 'Администратор', description:"Описание роли" })
  @IsString({ message: 'Значечние должно быть строкой' })
  readonly description: string;
}
