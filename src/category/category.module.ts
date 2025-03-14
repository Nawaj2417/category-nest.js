import { Category } from './category.entity';
import { CategoryController } from './category.controller';
import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';                    

@Module({
    imports: [TypeOrmModule.forFeature([Category])],
    providers: [CategoryService],
    controllers: [CategoryController]
})
export class CategoryModule {}

