import { ApiProperty } from "@nestjs/swagger/dist/decorators";

export class BanUserDto {
  @ApiProperty({ example: 1, description: 'ID пользователя'})
  readonly userId: number;

  @ApiProperty({ example: 'Надоел', description: 'Причина бана'})
  readonly banReason: string;
}