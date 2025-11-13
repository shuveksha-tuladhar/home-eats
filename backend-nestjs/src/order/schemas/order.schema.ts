import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { OrderedDish, OrderedDishSchema } from './ordered-dish.schema';
import { OrderStatusEnum } from '../types/order-status';

export interface OrderDocument extends Order, Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true, trim: true })
  address: string;

  @Prop({ required: true, trim: true })
  city: string;

  @Prop({ required: true, trim: true })
  state: string;

  @Prop({ required: true, min: 0 })
  amount: number;

  @Prop({ required: true, trim: true })
  paymentToken: string;

  @Prop({ type: [OrderedDishSchema], default: [] })
  dishes: OrderedDish[];

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  restaurantId: string;

  @Prop({
    type: String,
    enum: Object.values(OrderStatusEnum),
    default: OrderStatusEnum.ACCEPTED,
  })
  status: OrderStatusEnum;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
