import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript"
import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/users.model";
import { Post } from "src/posts/posts.model";


interface TopicCreationAttrs {
  name: string
  userId: number;
}

@Table({ tableName: 'topics' })
export class Topic extends Model<Topic, TopicCreationAttrs> {
  @ApiProperty({ example: 1, description:"Уникальный идентификатор" })
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number

  @ApiProperty({ example: 'Новости', description:"Название" })
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  name: string

  @ApiProperty({ example: 'ARVG', description:"Автор"})
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number

  @BelongsTo(() => User)
  author: User;

  @ApiProperty({ example: '[]', description:"Список постов данной темы" })
  @HasMany(() => Post)
  posts: Post[]
}