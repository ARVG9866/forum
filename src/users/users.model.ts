import { ApiProperty } from "@nestjs/swagger/dist/decorators";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript"
import { Role } from "src/roles/roles.model";
import { UsersRoles } from "src/roles/users-roles-model";

interface UserCreationAttrs {
  login: string;
  password: string;
  userName: string;
  email: string;
  image: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs > {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;
  
  @ApiProperty({ example: 'ARVG', description: 'Логин'})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  login: string;
  
  @ApiProperty({ example: '12345', description: 'Пароль'})
  @Column({type: DataType.STRING, allowNull: false})
  password: string;
  
  @ApiProperty({ example: 'Джеки', description: 'Имя пользователя'})
  @Column({type: DataType.STRING, allowNull: false})
  userName: string;
  
  @ApiProperty({ example: 'asd@gmail.com', description: 'Почта'})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  email: string;
  
  @ApiProperty({ example: false, description: 'Забанен'})
  @Column({type: DataType.BOOLEAN, defaultValue: false})
  banned: boolean;
  
  @ApiProperty({ example: 'Много говорит', description: 'Причина бана'})
  @Column({type: DataType.STRING, allowNull: true})
  banReason: string;
  
  @ApiProperty({ example: 0, description: 'Рейтинг пользователя'})
  @Column({type: DataType.INTEGER, defaultValue: 0})
  rating: number;

  @ApiProperty({ example: '/myNudes.jpg', description:"Ссылка на файл" })
  @Column({type: DataType.STRING})
  image: string;

  @ApiProperty( { example: [], description: 'ID ролей пользователя'})
  @BelongsToMany(() => Role, () => UsersRoles)
  roles: Role[]

}
