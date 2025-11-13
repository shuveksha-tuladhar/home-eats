import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface IDishDocument extends Dish, Document {}

@Schema({ _id: true })
export class Dish {
  [x: string]: any;

  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ trim: true })
  description?: string;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({ type: [String] })
  imageUrls: string[];

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: [String] })
  categories: string[];

  @Prop({ type: [String] })
  sides?: string[];
}

export const DishSchema = SchemaFactory.createForClass(Dish);
