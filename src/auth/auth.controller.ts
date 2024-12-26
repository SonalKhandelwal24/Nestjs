import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { RoleGuard } from './role.guard';
import { Role } from './ROLE';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}
    @Post('/login')
    @UseGuards(AuthGuard('local'))
    login(@Req() req : Request){
        const user = req.user;
        return this.authService.generateToken(user);
        // return this.authService.signIn();
    }

    @Get('/getAdminInfo')
    @UseGuards(AuthGuard('jwt'), new RoleGuard([Role.ROLES.ADMIN]))
    getAdminInfoData(@Req() req : Request){
        return 'Admin list = ' + JSON.stringify(req.user);
    }

    @Get('/getUserInfo')
    @UseGuards(AuthGuard('jwt'), new RoleGuard([Role.ROLES.USER, Role.ROLES.ADMIN]))
    getUserInfoData(@Req() req : Request){
        return 'User list = ' + JSON.stringify(req.user)
    }

    @Get('/getManagerInfo')
    @UseGuards(AuthGuard('jwt'), new RoleGuard([Role.ROLES.ADMIN, Role.ROLES.MANAGER]))
    getManagerInfoData(@Req() req : Request){
        return 'Manager list = ' + JSON.stringify(req.user)
    }
    
}
