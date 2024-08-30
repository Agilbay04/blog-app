import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { PostModule } from './post.module';

@Module({
  imports: [UserModule, PostModule],
})
export class AppModule {}
