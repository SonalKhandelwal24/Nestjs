import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { RoleGuard } from './auth/role.guard';
import { Role } from './role';
import {Request} from 'express'

@Controller('app')
export class AppController {
  constructor (private readonly authService : AuthService) {}

  @Post('/login')
  @UseGuards(AuthGuard('local'))
  login(@Req() req) : string {
    // authentication complete
    // next step is to authorization
    // id card jwt token
    return this.authService.generateToken(req.user);
  }

  @Get('/android-developer')
  @UseGuards(AuthGuard('jwt'), new RoleGuard(Role.ROLES.ANDROID_DEVELOPER))
  androidDeveloperData(@Req() req : Request ){
    return "This is a private data for android developer" + JSON.stringify(req.user);
  }

  @Get('/web-developer')
  @UseGuards(AuthGuard('jwt'), new RoleGuard(Role.ROLES.WEB_DEVELOPER))
  webDeveloperData(@Req() req : Request ) {
    return "This is a private data for web developer" + JSON.stringify(req.user);
  }

 

}
