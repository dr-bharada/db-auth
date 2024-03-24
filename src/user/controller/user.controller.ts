import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserSerice } from '../service/user.service';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { ApiSecurity } from '@nestjs/swagger';
import { RequestValidatePipe } from 'src/common/pipes/request-validate.pipe';
@Controller('auth')
@UseGuards(AuthGuard)
@ApiSecurity("Token")
export class AuthController {
  constructor(private userService: UserSerice) { }
  @Post('register')
  @UsePipes(new RequestValidatePipe())
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.registerUser(createUserDto);
  }
  @Post('login')
  @UsePipes(new ValidationPipe())
  login(@Body() createUserDto: CreateUserDto) {
    return this.userService.registerUser(createUserDto);
  }
  @Post('sendOTP')
  @UsePipes(new ValidationPipe())
  sendOTP(@Body() createUserDto: CreateUserDto) {
    return this.userService.registerUser(createUserDto);
  }
  @Post('sendOTP2')
  @UsePipes(new ValidationPipe())
  sendOTP2(@Body() createUserDto: CreateUserDto) {
    return this.userService.registerUser(createUserDto);
  }
  @Post('deleteUser')
  @UsePipes(new ValidationPipe())
  deleteUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.registerUser(createUserDto);
  }
}
