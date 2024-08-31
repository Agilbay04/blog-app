import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { PostModule } from './post.module';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    UserModule, 
    PostModule, 
    AuthModule
  ],
})
export class AppModule {}
