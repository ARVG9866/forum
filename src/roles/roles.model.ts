import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript"
import { ApiProperty } from "@nestjs/swagger";
import { UsersRoles } from "./users-roles-model";
import { User } from "src/users/users.model";


interface RoleCreationAttrs {
  value: string
  level: number
  description: string
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttrs> {
  @ApiProperty({ example: 1, description:"Уникальный идентификатор" })
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number

  @ApiProperty({ example: 'admin', description:"Значение" })
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  value: string

  @ApiProperty({ example: '99', description:"Уровень роли пользователя" })
  @Column({type: DataType.INTEGER, allowNull: false})
  level: number

  @ApiProperty({ example: 'Администратор', description:"Описание роли" })
  @Column({type: DataType.STRING, allowNull: false})
  description :string

  @ApiProperty({ example: '[]', description:"ID пользователей данной роли" })
  @BelongsToMany(() => User, () => UsersRoles)
  users: User[]

}