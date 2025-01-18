import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoController } from './todo/todo.controller';
import { CategoryController } from './category/category.controller';
import { CategoryService } from './category/category.service';
import { CategoryModule } from './category/category.module';
import { TodoService } from './todo/todo.service';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'todo_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    CategoryModule, TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
