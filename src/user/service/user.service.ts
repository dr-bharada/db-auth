import { Injectable } from '@nestjs/common';
import { LoginDto, NewUserDto, PasswordDto } from '../dto/auth-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { User } from '../models/user';
import { JwtUserTokenService } from 'src/common/service/jwt-user-token.service';
import { JwtToken } from 'src/common/dto/jwt-token.dto';
@Injectable()
export class UserSerice {

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private jwtToken: JwtUserTokenService
  ) { }
  async registerUser(createUserDto: NewUserDto) {
    const existingUser = await this.findByEmail(createUserDto.email);
    if (existingUser) {
      return { error: 'Email already exists' }; // Return error response
    }
    const user = new this.userModel(createUserDto);
    await user.save();
    return { message: 'User registered successfully' }; // Return success response
  }
  async findByEmail(email) {
    return this.userModel.findOne({ email });
  }
  async setPassword(passwordDto: PasswordDto) {
    if (!isValidObjectId(passwordDto.userId)) {
      return { message: 'User Not Found' }; // Return success response
    }
    const user: User = await this.userModel.findById(passwordDto.userId);
    if (!user) {
      return { message: 'User Not Found' }; 
    }
    user.newPassword = passwordDto.password;
    await user.save();
    return { message: 'Password updated successfully' };
  }
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user  = await this.userModel.findOne({ email, newPassword: password }).exec();
    console.log(user);
    if (!user) {
      return { message: 'Invalid credentials' }; 
    }
    return { message: 'Login Successfully credentials', token: this.jwtToken.encrytToken(user as JwtToken) }
  }

  getAllUser() {
    return this.userModel.find().select('-newPassword -oldPassword').exec();
  }
}
