import { Module } from '@nestjs/common';
import { AuthController } from './controller/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './models/user';
import { UserSerice } from './service/user.service';
import { JwtUserTokenService } from 'src/common/service/jwt-user-token.service';
import { JwtModule } from '@nestjs/jwt';
@Module({
  controllers: [AuthController],
  providers: [UserSerice,
    JwtUserTokenService,],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema, collection: 'nest_user' }]),
    JwtModule.register({
      secret: 'DB_KEY',
      signOptions: { expiresIn: '1d' },
    })
  ],
})
export class UserModule { }
