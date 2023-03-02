import { forwardRef, Module } from '@nestjs/common';
import { GuardsModule } from 'src/guards/guards.module';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() => UsersModule),
    GuardsModule
  ],
  exports: [
    AuthService,
  ]
})
export class AuthModule {}
