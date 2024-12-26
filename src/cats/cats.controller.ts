import { Body, Controller, Delete, Get, Param, Post, Put, HttpCode, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDTO } from './dto/create-cat.dto';

@Controller('cats')
export class CatsController {

    constructor(private readonly catsService: CatsService) { }

    @Post()
    @UsePipes(ValidationPipe)
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createCatDTO: CreateCatDTO) {
        this.catsService.create(createCatDTO);
        return { message: 'Cat created successfully' };
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll() {
        return this.catsService.findAll();
    }

    @Get(':name')
    @HttpCode(HttpStatus.OK)
    async findOne(@Param('name') name: string) {
        return this.catsService.findOne(name);
    }

    @Put(':name')
    @UsePipes(ValidationPipe)
    @HttpCode(HttpStatus.OK)
    async updateOne(@Param('name') name:string, @Body() createCatDTO: CreateCatDTO) {
        const result = await this.catsService.updateOne(name, createCatDTO);
        if(result) {
            return { message: `Cat with name ${name} updated successfully.` };
        } 
        else {
            return { message: `Cat with name ${name} not found.` };
        }
    }

    @Delete(':name') 
    @HttpCode(HttpStatus.OK)
    async remove(@Param('name') name: string) {
        const result = await this.catsService.delete(name);
        if (result) {
            return { message: `Cat with name ${name} deleted successfully.` };
        } else {
            return { message: `Cat with name ${name} not found.` };
        }
    }

    // @Get('/addcat')
    // addCat () : string {
    //     return "Hello kitti";
    // }
}
