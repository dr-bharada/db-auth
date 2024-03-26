// user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema({ versionKey: false })
export class RestApi extends Document {
  @Prop()
  apiName: string;
  @Prop()
  apiType: string;
  @Prop()
  roles: string[];
  @Prop({ default: false }) // Specify default value for softDelete
  softDelete: boolean;
}
export const RestApiSchema = SchemaFactory.createForClass(RestApi);


export class RestApiDto {
  apiName : string
  apiType: string;
  roles?: string[];
  softDelete?: boolean;
}

export interface RestApiValidate {
  apiName : string
  roles?: string[];
}

