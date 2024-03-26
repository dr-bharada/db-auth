import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { UserModule } from './user/user.module';
import { AuthGuard } from './common/guard/auth.guard';
import { RestApiService } from './common/service/rest-api.service';
import { RestApi, RestApiSchema } from './common/models/restApi';
import { APP_GUARD } from '@nestjs/core';
@Module({
  imports: [
    UserModule,
    MongooseModule.forRootAsync({
      useFactory: async () => {
        const configFile = 'config.yml';
        const fileContents = fs.readFileSync(configFile, 'utf8');
        const config = yaml.load(fileContents);
        const mongodbUrl = config.mongodb.uri;
        return {
          uri: mongodbUrl,
        };
      },
    }),
    MongooseModule.forFeature([{ name: RestApi.name, schema: RestApiSchema }]),
  ],
  controllers: [],
  providers: [
    RestApiService,
    {
      provide:APP_GUARD,
      useClass:AuthGuard
    },
    // JwtService,
    // JwtUserTokenService
  ],
})
export class AppModule { }
