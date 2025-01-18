import { Controller,Get,Post,Delete,Put,Body,Param } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodo } from './todo.dto';

@Controller('todo')
export class TodoController {
    constructor(private readonly todoService:TodoService){}

    @Post()
    async create(@Body() createTodos:CreateTodo){
        return this.todoService.create(createTodos);
    }

    @Get()
    async findAll(){
        return this.todoService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id:number)
    {
        return this.todoService.findOne(id);
    }

    @Delete(":id")
    async delete(@Param('id') id: number)
    {
        return this.todoService.remove(id);
    }

    @Put(":id")
    async update(@Param('id') id:number, @Body() updateTodos:CreateTodo)
    {
        return this.todoService.update(id,updateTodos);
    }

}
