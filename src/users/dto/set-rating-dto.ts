import { ApiProperty } from "@nestjs/swagger/dist/decorators";

export class SetRatingUserDto {
  @ApiProperty({ example: 1, description: 'ID пользователя'})
  readonly userId: number;

  @ApiProperty({ example: 150, description: 'Установить рейтинг'})
  readonly rating: number;
}