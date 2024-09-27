import { Controller, Get, Post, Req, Res, Body, Patch, Param, Delete, UnauthorizedException, UseGuards, Put, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { Request, Response } from 'express';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) { }

  // @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() body: { email: string; password: string }, @Req() req: Request, @Res() res: any) {
    const { email, password } = body;

    const user = await this.authService.validateUser(email, password);
    // console.log(password, user.password);
    if (user) {
      const accessToken = await this.authService.generateAccessToken(user._id, user.role);
      const refreshToken = await this.authService.generateRefreshToken(user._id);
      // console.log("User", user);
      // console.log("Token generated", accessToken);
      // console.log("Refresh Token", refreshToken);

      // Set the token in the cookie
      res.cookie('auth_token', accessToken, {
        httpOnly: true,   // Ensures cookie can't be accessed via client-side JavaScript
        secure: false,    // Set to false for localhost (HTTPS is not required in local development)
        maxAge: 1000 * 60 * 60 * 24 * 7,   // 1 week
        sameSite: 'Lax',  // 'Lax' is generally safe for same-origin or local development
      });

      res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: 'Lax',
      });

      // Send the response
      return res.send({
        message: 'Logged in successfully',
        accessToken,
        refreshToken,
        user
      });
    }
    else {
      throw new UnauthorizedException("Invalid username or password");
    }

  }

  @Put('change-password')
  async changePassword(@Body() changePasswordDto: ChangePasswordDto, @Req() req) {
    return this.authService.changePassword(
      req.userId,
      changePasswordDto.oldPassword,
      changePasswordDto.oldPassword,
    );
  }

  @Post("forgot-password")
  async forgotPassword(@Body('email') email: string) {
    await this.authService.forgotPassword(email);
    return { message: "Password reset link send to your email"};
  }

  @Put("reset-password")
  async resetPassword(@Query('token') token: string, @Body('newPassword') newPassword: string) {
    await this.authService.resetPassword(token, newPassword);
    return { message: "Password has been reset successfully" };
  }

}
