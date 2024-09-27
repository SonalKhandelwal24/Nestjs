import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {Document} from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {

    _id: string;

    @Prop()
    userid : number;

    @Prop()
    name : string;

    @Prop({ unique: true })
    username : string;

    @Prop({ unique: true })
    email: string;

    @Prop()
    phone_number: string;

    @Prop()
    password: string;

    @Prop()
    role: string;

    @Prop({default: Date.now()})
    registerDate: string;

    @Prop({default: Date.now()})
    registerTime: string;

}

export const UserSchema = SchemaFactory.createForClass(User);
