import { CreateTodo } from './todo.dto';
import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';


@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(Todo)
        private readonly todoRepository: Repository<Todo>,
    ) {}


   async create(CreateTodos:CreateTodo):Promise<Todo> {
      const todo = this.todoRepository.create(CreateTodos);
      return this.todoRepository.save(todo);
   }

   async findAll():Promise<Todo[]> {
    return this.todoRepository.find();
   }
   async findOne(id:number):Promise<Todo>{
    const todo = await this.todoRepository.findOne({where:{id}})
    if(!todo)
    {
        throw new NotFoundException(`Todo with ID ${id} not found`)
    }
    return todo;
   }

   async update(id:number, UpdateTodos:CreateTodo):Promise<Todo> {
    await this.todoRepository.update(id,UpdateTodos);
    return this.todoRepository.findOne({where: {id}})

   }

   async remove (id:number):Promise<{}> {
    await this.todoRepository.delete(id);
    return
    
   }


   

}
