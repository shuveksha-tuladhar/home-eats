import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Dish, DishSchema } from './dish.schema';
import { Review, ReviewSchema } from './review.schema';
import OpeningHourSchema, { OpeningHour } from './opening-hour.schema';

export interface RestaurantDocument extends Restaurant, Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

@Schema({ timestamps: true })
export class Restaurant {
  @Prop({ required: true, trim: true, unique: true })
  name: string;

  @Prop({ trim: true })
  description?: string;

  @Prop({ type: [String] })
  imageUrls: string[];

  @Prop()
  owner: string;

  @Prop({ trim: true })
  phoneNumber: string;

  @Prop({ trim: true })
  address: string;

  @Prop({ trim: true })
  city: string;

  @Prop({ trim: true })
  state: string;

  @Prop({ trim: true })
  zipCode: string;

  @Prop()
  latitude?: number;

  @Prop()
  longitude?: number;

  @Prop({ type: [OpeningHourSchema] })
  openingHours: OpeningHour[];

  @Prop({ type: [DishSchema] })
  menu: Dish[];

  @Prop({ type: [ReviewSchema] })
  reviews: Review[];
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
