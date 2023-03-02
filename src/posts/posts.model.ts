import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript"
import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/users.model";
import { Topic } from "src/topics/topics.model";

interface PostCreatorAttrs {
  title: string;
  content: string;
  topicId: number;
  userId: number;
  image: string;
}

@Table({ tableName: 'posts' })
export class Post extends Model<Post, PostCreatorAttrs> {
  @ApiProperty({ example: 1, description:"Уникальный идентификатор" })
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number

  @ApiProperty({ example: 'Задержали местных...', description:"Оглавление" })
  @Column({type: DataType.STRING,unique: true, allowNull: false})
  title: string

  @ApiProperty({ example: 'В подмосковье трое неизвестных...', description:"Содержание" })
  @Column({type: DataType.STRING, allowNull: false})
  content: string

  @ApiProperty({ example: '/myNudes.jpg', description:"Ссылка на файл" })
  @Column({type: DataType.STRING})
  image: string;

  @ApiProperty({ example: 'Новости', description:"Тема"})
  @ForeignKey(() => Topic)
  @Column({ type: DataType.INTEGER })
  topicId: number

  @BelongsTo(() => Topic)
  topic: Topic

  @ApiProperty({ example: 'ARVG', description:"Автор"})
  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER})
  userId: number

  @BelongsTo(() => User)
  author: User
}