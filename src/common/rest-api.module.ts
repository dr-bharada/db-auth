import { Module } from '@nestjs/common';
import { RestApiRervice } from './service/rest-api.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RestApi, RestApiSchema } from './models/restApi';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: RestApi.name, schema: RestApiSchema }]),
  ],
  providers: [RestApiRervice],
})
export class RestApiModule {}
