// user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema({
  versionKey: false,
  //  toJSON: {
  //   transform: function (doc, ret) { ret.id = ret._id.toString(); delete ret._id; return ret; }
  // }
})
export class User extends Document {
  @Prop()
  id: string;
  @Prop()
  firstName: string;
  @Prop()
  lastName: string;
  @Prop()
  email: string;
  @Prop()
  fullName: string;
  @Prop()
  date: Date;
  @Prop()
  dob: Date;
  @Prop()
  gender: string;
  @Prop({ type: [String] })
  roles: string[];
  @Prop()
  currentRole: string;
  @Prop()
  imageUrl: string;
  @Prop()
  newPassword: string;
  @Prop({ type: [String] })
  oldPassword: string[];
  @Prop()
  softDelete: boolean;
}
export const UserSchema = SchemaFactory.createForClass(User);
