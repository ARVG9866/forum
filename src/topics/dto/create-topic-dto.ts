import { ApiProperty } from "@nestjs/swagger/dist/decorators";

export class CreateTopicDto {
  @ApiProperty({ example: 'Новости', description:"Название темы" })
  readonly name: string;

  @ApiProperty({ example: '1', description:"ID пользователя" })
  readonly userId: number;
}
