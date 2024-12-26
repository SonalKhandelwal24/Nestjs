import { Injectable, NotFoundException} from '@nestjs/common';
import { CreateCatDTO } from './dto/create-cat.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './schemas/cat.schema';

@Injectable()
export class CatsService {

    // constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}
    private readonly cats: CreateCatDTO[] = [];

    create(createCatDto: CreateCatDTO) {
        this.cats.push(createCatDto);
    }

    findAll() {
        return this.cats;
    }

    findOne(name: string) {
        const cat = this.cats.find(cats => cats.name === name);
        if (!cat) {
            throw new NotFoundException(`Cat with name ${name} not found.`);
        }
        return cat;
    }

    updateOne(name: string, cat: CreateCatDTO) {
        const index = this.cats.findIndex(cat => cat.name === name);
        if (index !== -1) {
            // Update the cat at the found index with the new data
            this.cats[index] = { ...this.cats[index], ...cat };
            return { message: `Cat with name ${name} updated successfully.` };
        } else {
            throw new NotFoundException(`Cat with name ${name} not found.`);
        }
    }

    delete(name: string) {
        const index = this.cats.findIndex(cat => cat.name === name);
        if (index !== -1) {
            this.cats.splice(index, 1);
            return { message: `Cat with name ${name} deleted successfully.` };
        } else {
            throw new NotFoundException(`Cat with name ${name} not found.`);
        }
    }

}
