import { Body, Controller, Get, Post, Patch, Delete, Param } from '@nestjs/common';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
    constructor(private readonly todosService: TodosService) { }
    @Get()
    async getAllTodos() {
        const todos = await this.todosService.getAllTodos();
        return todos;
    }

    @Post()
    async addTodo(@Body('title') title: string, @Body('completed') completed: boolean) {
        const createdTodo = await this.todosService.insertTodo(title, completed);
        return createdTodo;
    }

    @Patch('/:id')
    async updateTodo(@Param('id') id: string, @Body('title') title: string, @Body('completed') completed: boolean) {
        const updatedTodo = await this.todosService.updateTodo(id, title, completed);
        console.log(updatedTodo);
        return updatedTodo;
    }

    @Delete('/:id')
    async deleteTodo(@Param('id') id: string) {
        const deletedTodo = await this.todosService.deleteTodo(id);
        console.log(deletedTodo);
        return deletedTodo;
    }

}
