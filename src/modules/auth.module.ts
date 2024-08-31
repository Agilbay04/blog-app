import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../controllers/auth.controller';
import { UserModule } from './user.module';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/services/user.service';
import { PrismaService } from 'src/services/prisma.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'PmlIi0Kew2',
      signOptions: { expiresIn: '15m' }
    }),
    HttpModule
  ],
  providers: [AuthService, UserService, PrismaService],
  controllers: [AuthController]
})
export class AuthModule {}
