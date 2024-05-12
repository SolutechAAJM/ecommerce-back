import { Body, Controller, Get, Post, Res, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ActiveUser } from '../common/decorators/active-user.decorator';
import { UserActiveInterface } from '../common/interfaces/user-active.interface';
import { Role } from '../common/enums/rol.enum';
import { AuthService } from './auth.service';
import { Auth } from './decorators/auth.decorator';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { EcommerceController } from '../admin/ecommerce.controller';

import { messages } from 'src/messages/messages';

@Controller('auth')
export class AuthController extends EcommerceController {
  constructor(private readonly authService: AuthService) {
    super();
  }


  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
    @Res() res: Response, 
  ) {
    try {
      const response = await this.authService.register(registerDto);
      return this.createdResponse(res, messages.userCreated, response); 
    } catch (error) {
      throw new HttpException(error.message , HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res() res: Response,
  ) {
    try {
      const response = await this.authService.login(loginDto);
      return this.successResponse(res, messages.successLogin, response); 
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

  @Get('profile')
  @Auth(Role.USER)
  async profile(
    @ActiveUser() user: UserActiveInterface,
    @Res() res: Response, 
  ) {
    try {
      const response = await this.authService.profile(user);
      return this.successResponse(res, messages.success, response); 
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
