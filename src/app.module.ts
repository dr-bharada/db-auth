import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { UserModule } from './user/user.module';
import { RestApiModule } from './common/rest-api.module';
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
    RestApiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
