import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export interface IReviewDocument extends Review, Document {}

@Schema({ _id: true })
export class Review {
  @Prop({ required: true, min: 1, max: 5 })
  rating: number;

  @Prop({ trim: true })
  comment?: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ required: true, trim: true })
  username: string;

  @Prop({ default: Date.now })
  commentedAt: Date;

  @Prop({ default: false })
  isFlagged: boolean;

  @Prop({ default: true })
  isApproved: boolean;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
