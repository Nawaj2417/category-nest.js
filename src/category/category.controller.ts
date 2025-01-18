import { Controller,Get,Post,Put,Delete,Param,Body } from '@nestjs/common';
import {CreateCategory} from './category.dto'
import { CategoryService } from './category.service';
@Controller('category')
export class CategoryController {
    constructor(private readonly category:CategoryService){}
    
    @Post()
    async create(@Body() createCategory: CreateCategory){
        return this.category.create(createCategory);
    }

    @Get()
    async findAll() {
        return this.category.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return this.category.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id:number, @Body() updatecategory:CreateCategory){
        return this.category.update(id, updatecategory)
    }

    @Delete(":id")
    async delete(@Param('id') id:number){
        return this.category.remove(id);
    }





}
