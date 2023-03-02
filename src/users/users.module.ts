import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersService } from './users.service';
import { User } from './users.model';
import { Role } from 'src/roles/roles.model';
import { UsersRoles } from 'src/roles/users-roles-model';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';
import { forwardRef } from '@nestjs/common/utils';
import { FilesModule } from 'src/files/files.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Role, UsersRoles]),
    RolesModule,
    FilesModule,
    forwardRef(() => AuthModule) 
  ],
  exports: [
    UsersService
  ]

})
export class UsersModule {}
