import { ApiProperty } from "@nestjs/swagger/dist/decorators";
import { IsNumber, IsString } from "class-validator";

export class AddRoleDto {
  @ApiProperty({ example: 'admin', description: 'Значение роли'})
  @IsString({message: "Значение должно быть строкой"})
  readonly value: string;

  @ApiProperty({ example: '12', description: 'ID пользователя'})
  @IsNumber({}, {message: 'Id может быть только числом'})
  readonly userId: number;
}