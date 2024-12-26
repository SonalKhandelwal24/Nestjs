import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth/auth.service';
import { AppService } from './app.service';

@Controller('/app')
export class AppController {

  // constructor(private readonly authService: AuthService) {}

  // CONTROLLER MODEL 
  constructor(private readonly appService: AppService) {}

  @Get('/log')
  userlogin(@Req() req : Request) {
    return "Thsi is a app controller class";
  }

  // CONTROLLER MODEL VIEW
  @Get()
  getView(@Res() res : Response) {
    return res.render("index", {books : this.appService.getAllBooks()})
  }

}
