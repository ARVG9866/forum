import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { Role } from "./roles.model";


@Table({ tableName: 'users_roles', createdAt: false, updatedAt: false})
export class UsersRoles extends Model<UsersRoles> {
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number

  @ForeignKey(() => Role)
  @Column({type: DataType.INTEGER})
  roleId: number

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER})
  userId: number
}