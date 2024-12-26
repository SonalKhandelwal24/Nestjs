import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';

@Controller('manager')
export class ManagerController {
 
}
