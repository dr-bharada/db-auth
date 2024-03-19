import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/user';
@Injectable()
export class UserSerice {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  async registerUser(createUserDto: CreateUserDto) {
    const existingUser = await this.findByEmail(createUserDto.email);
    if (existingUser) {
      return { error: 'Email already exists' }; // Return error response
    }
    // const user = new this.userModel(createUserDto);
    // await user.save();
    return { message: 'User registered successfully' }; // Return success response
  }
  async findByEmail(email) {
    return this.userModel.findOne({ email });
  }
  getAllUser() {
    return this.userModel.find().select('-newPassword -oldPassword').exec();
  }
}
