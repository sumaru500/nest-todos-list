import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from './todo.model';
@Injectable()
export class TodosService {

    constructor(@InjectModel('todos') private readonly todoModel: Model<Todo>) { }

    async getAllTodos() {
        const result = await this.todoModel.find().exec();
        return result.map(todo => (
            {
                id: todo._id,
                title: todo.title,
                completed: todo.completed
            }))
    }

    async insertTodo(title: string, completed: boolean) {
        const newTodo = new this.todoModel({ title, completed });
        const result = await newTodo.save();
        return {
            id: result._id,
            title: result.title,
            completed: result.completed
        };
    }

    async updateTodo(id: string, title: string, completed: boolean) {
        const toUpdateTodo = await this.findTodoById(id);
        if (title) {
            toUpdateTodo.title = title;
        }
        if (completed !== undefined) {
            toUpdateTodo.completed = completed;
        } 
        const result = await toUpdateTodo.save();
        console.log(result);
        return { id : result._id };
    }

    private async findTodoById(id: string): Promise<Todo> {
        let result;
        try {
            result = await this.todoModel.findById(id);
        }
        catch (err) {
            throw new NotFoundException(`findTodoById : Could not find todo ${id}`);
        }
        return result;
    }

    async deleteTodo(id: string) {
        let result;
        try {
            result = this.todoModel.deleteOne({ _id: id })
        }
        catch (err) {
            throw new NotFoundException(`delete : Could not find todo ${id}`);
        }
        return result;
    }
}
