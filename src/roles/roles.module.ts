import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { GuardsModule } from 'src/guards/guards.module';
import { User } from 'src/users/users.model';
import { RolesController } from './roles.controller';
import { Role } from './roles.model';
import { RolesService } from './roles.service';
import { UsersRoles } from './users-roles-model';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [
    SequelizeModule.forFeature([Role, User, UsersRoles]),
    GuardsModule
  ],
  exports: [
    RolesService
  ]
})
export class RolesModule {}
