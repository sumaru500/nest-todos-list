import * as mongoose from "mongoose";

export const TodoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, required: true }
})

export interface Todo extends mongoose.Document {
    id: string;
    title: string;
    completed: boolean;
}