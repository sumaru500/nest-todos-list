import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WebSocketModule } from '../websocket/websocket.module';
import { TodoSchema } from './todo.model';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: "todos", schema: TodoSchema }]),
    WebSocketModule],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule { }
