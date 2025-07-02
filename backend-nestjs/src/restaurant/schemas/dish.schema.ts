import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Review, ReviewSchema } from './review.schema';

export interface IDishDocument extends Dish, Document {}

@Schema({ _id: true })
export class Dish {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ trim: true })
  description?: string;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({ type: [String], default: [] })
  imageUrls: string[];

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: [String], default: [] })
  categories: string[];

  @Prop({ type: [String], default: [] })
  sides: string[];

  @Prop({ default: 0, min: 0, max: 5 })
  rating: number;

  @Prop({ type: [ReviewSchema], default: [] })
  reviews: Review[];
}

export const DishSchema = SchemaFactory.createForClass(Dish);
