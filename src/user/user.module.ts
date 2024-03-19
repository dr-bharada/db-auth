import { Module } from '@nestjs/common';
import { AuthController } from './controller/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './models/user';
import { UserSerice } from './service/user.service';
@Module({
  controllers: [AuthController],
  providers: [UserSerice],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema ,collection:'nest_user'}]),
  ],
})
export class UserModule {}
