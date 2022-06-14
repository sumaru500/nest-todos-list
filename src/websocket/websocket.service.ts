import { Injectable, Logger } from '@nestjs/common';
// import  {w3cwebsocket as W3CWebSocket} from "websocket";
// import {WebSocket} from 'ws';
import { io } from 'socket.io-client';

@Injectable()
export class WebSocketService {
    private logger: Logger = new Logger('Client socket');
    private client = io(`http://localhost:${global.gateway_port}`);
    // private client = new WebSocket("http://localhost:4001");

    constructor() {
        const intervalId = setInterval(() => {
            if (this.client.connected === false) {
                this.logger.log('Retry to connect to server');
                this.client.connect()
            }
        }, 2000)

        this.client.on('connection', (socket) => {
            this.logger.log("Client socket connected");
            this.client.send(Math.random());
            clearInterval(intervalId);
        });

        this.client.on('error', (error) => {
            console.log("Server Client socket errorss", error);
        });

        this.client.on('message', function (message) {
            console.log(message);
        });

        // setInterval(() => {
        //     this.logger.log('Send a message to server');
        //     this.send({type: "todos", message: "Hello Server"});
        // }, 3000);
    }

    send(data: any) {
        this.client.emit('todos', data);
    }

    onMessage(handler: Function) {
        // ...
    }

    // ...
}
