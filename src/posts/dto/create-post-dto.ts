import { ApiProperty } from "@nestjs/swagger/dist/decorators";

export class CreatePostDto {
  @ApiProperty({ example: 'Задержали местных...', description:"Оглавление" })
  readonly title: string;

  @ApiProperty({ example: 'В подмосковье трое неизвестных...', description:"Содержание" })
  readonly content: string;

  @ApiProperty({ example: 1, description:"Тема" })
  readonly topicId: number;

  @ApiProperty({ example: 1, description:"Автор" })
  readonly userId: number;
}
