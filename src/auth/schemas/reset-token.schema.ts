import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

export type ResetTokenDocument = ResetToken & Document;

@Schema({ versionKey: false, timestamps: true})
export class  ResetToken {

    @Prop({ required: true})
    token: string;

    @Prop({ required: true})
    userId: string;

    @Prop({ default: Date.now, required: true})
    expiryDate: Date;
} 

export const ResetTokenSchema = SchemaFactory.createForClass(ResetToken);