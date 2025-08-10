import mongoose, { Document, Schema } from "mongoose";

export interface ITask extends Document {
    user: mongoose.Schema.Types.ObjectId;
    text: string;
    completed: boolean;
}

const taskSchema: Schema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    text: {
        type: String,
        required: [true, 'Please enter a valid text']
    },
    completed: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
});

export default mongoose.model<ITask>('Task', taskSchema); 