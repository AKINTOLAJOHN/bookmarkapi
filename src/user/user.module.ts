import { Module } from '@nestjs/common';
import { Authservice } from 'src/auth/auth.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({

  controllers: [UserController],

  providers : [UserService,Authservice]
})
export class UserModule {}
