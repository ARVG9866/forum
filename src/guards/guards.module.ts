import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt/dist';


@Module({
  imports: [
    JwtModule.register( {
      secret: process.env.PRIVATE_KEY || 'secret',
      signOptions: {
        expiresIn: '24h'
      }
    })
  ],
  exports: [
    JwtModule
  ]
})
export class GuardsModule {}
