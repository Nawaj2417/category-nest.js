import { CreateCategory } from './category.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ){}


    async findAll(): Promise<Category[]> {
        return await this.categoryRepository.find();
    }

    async findOne( id: number): Promise<Category> {
        return await this.categoryRepository.findOne({where:{id}});
    }

    async create(CreateCategory: CreateCategory):Promise<Category> {
        const post = this.categoryRepository.create(CreateCategory);
        return this.categoryRepository.save(post);
    }

    async update(id:number,UpdateCategory:CreateCategory):Promise<Category>{
        await this.categoryRepository.update(id,UpdateCategory);
        return this.categoryRepository.findOne({where:{id}});
    }

    async remove (id:number):Promise<{}>{
        await this.categoryRepository.delete(id);
        return
    }









}
