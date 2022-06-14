import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodosModule } from './todos/todos.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AppGateway } from './gateway/app.gateway';


@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/todosDB'),
    TodosModule],
  controllers: [AppController],
  providers: [AppService,
    AppGateway
  ],
})
export class AppModule { }
