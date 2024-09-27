import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {Document} from 'mongoose';

export type AttendanceDocument = Attendance & Document;

@Schema()
export class Attendance {

    @Prop()
    attendanceid : number;

    @Prop()
    name : string;

    @Prop()
    username : string;

    @Prop()
    email: string;

    @Prop()
    phone_number: string;

    @Prop({default: Date.now()})
    date: string;

    @Prop({default: Date.now()})
    signIn: string;

    // @Prop()
    // siteView: number;

}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);
