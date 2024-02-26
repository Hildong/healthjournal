import { Document, Schema, Types, model } from "mongoose"
import bcrypt from 'bcrypt'

export interface IUser {
    customerId: Types.ObjectId,
    firstName: string,
    lastName: string,
    email: string,
    password: string
    role: string
}

export interface IUserDocument extends IUser, Document {
    correctPassword: (inputtedPassword: string) => Promise<boolean>
}

const userSchema = new Schema<IUserDocument>(
    {
        customerId: {type: Schema.Types.ObjectId, required: true},
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true},
        role: {type: String, required: true}
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