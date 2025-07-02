import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface IOrderedDishDocument extends OrderedDish, Document {}

@Schema({ _id: true })
export class OrderedDish {
  @Prop({ required: true })
  dishId: string;

  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({ required: true, min: 1 })
  quantity: number;
}

export const OrderedDishSchema = SchemaFactory.createForClass(OrderedDish);
