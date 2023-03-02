import { ApiProperty } from "@nestjs/swagger/dist/decorators";

export class UpdateTopicDto {
  @ApiProperty({ example: 'Новости', description:"Название темы" })
  readonly name: string;
}
