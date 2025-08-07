import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
}

const userSchema: Schema = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter a valid name']
    },
    email: {
        type: String,
        required: [true, 'Please enter a valid email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please enter a password']
    },
}, {
    timestamps: true
});

export default mongoose.model<IUser>('User', userSchema);