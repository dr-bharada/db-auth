import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginDto, NewUserDto, PasswordDto } from '../dto/auth-user.dto';
import { UserSerice } from '../service/user.service';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
@Controller('auth')
@ApiTags("auth-controller")
@ApiSecurity("Token")
export class AuthController {
  constructor(private userService: UserSerice) { }
  @Post('register')
  @UsePipes(new ValidationPipe())
  register(@Body() createUserDto: NewUserDto) {
    return this.userService.registerUser(createUserDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto)
  }

  @Post('newPassword')
  newPassword(@Body() userPassword: PasswordDto) {
    return this.userService.setPassword(userPassword)
  }

  @Post('getAllUser')
  getAllUser() {
    return this.userService.getAllUser()
  }
}
