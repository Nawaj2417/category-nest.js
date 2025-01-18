import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategory } from './category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find({ 
      relations: ['subcategories', 'parent'] 
    });
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['subcategories', 'parent'],
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async create(createCategoryDto: CreateCategory): Promise<Category> {
    const { name, parentId } = createCategoryDto;
    const category = new Category();
    category.name = name;

    if (parentId) {
      const parentCategory = await this.categoryRepository.findOne({ where: { id: parentId } });
      category.parent = parentCategory;
    }

    return this.categoryRepository.save(category);
  }

  async update(id: number, updateCategoryDto: CreateCategory): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    if (updateCategoryDto.name) {
      category.name = updateCategoryDto.name;
    }

    if (updateCategoryDto.parentId) {
      const parentCategory = await this.categoryRepository.findOne({ where: { id: updateCategoryDto.parentId } });
      category.parent = parentCategory;
    }

    return this.categoryRepository.save(category);
  }

  async remove(id: number): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}
