import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common/decorators';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { JwtAuthGuadr } from 'src/auth/jwt-guard.auth';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @UseGuards(JwtAuthGuadr)
  @Post()
  create(@Body() dto: CreateTodoDto) {
    return this.todosService.create(dto);
  }

  @UseGuards(JwtAuthGuadr)
  @Get()
  findMany() {
    return this.todosService.findMany();
  }

  @UseGuards(JwtAuthGuadr)
  @Put(':id')
  update(@Param('id') id: number, @Body() dto: CreateTodoDto) {
    return this.todosService.update(id, dto);
  }

  @UseGuards(JwtAuthGuadr)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.todosService.delete(id);
  }
}
