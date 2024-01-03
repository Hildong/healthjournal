import { Document, Schema, Types, model } from "mongoose"
import bcrypt from 'bcrypt'

export interface IUser {
    username: string;
    email: string;
    password: string;
}

export interface IUserDocument extends IUser, Document {
    correctPassword: (inputtedPassword: string) => Promise<boolean>
}

const userSchema = new Schema<IUserDocument>(
    {
        username: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true}
    }
)

userSchema.methods.correctPassword = async function(inputtedPassword: string) {
    const user = await User.findOne({email: this.email}).select("+password")
    if(user) {
        return await bcrypt.compare(inputtedPassword, user.password)
    }
    return Error("There was an error in comparing users password and inputted password")
}

export const User = model<IUserDocument>("Users", userSchema) 