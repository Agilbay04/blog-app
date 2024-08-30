import { Module } from '@nestjs/common';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { config } from '../configs/config';
import { PrismaService } from '../services/prisma.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    })
  ],
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule {}
