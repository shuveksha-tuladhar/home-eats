import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Dish, DishSchema } from './dish.schema';
import { Review, ReviewSchema } from './review.schema';
import OpeningHourSchema, { OpeningHour } from './openingHour.schema';

export interface IRestaurantDocument extends Restaurant, Document {}

@Schema({ timestamps: true })
export class Restaurant {
  @Prop({ required: true, trim: true, unique: true })
  name: string;

  @Prop({ trim: true })
  description?: string;

  @Prop({ type: [String], default: [] })
  imageUrls: string[];

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  owner: Types.ObjectId;

  @Prop({ trim: true })
  phoneNumber?: string;

  @Prop({ trim: true })
  address?: string;

  @Prop({ trim: true })
  city?: string;

  @Prop({ trim: true })
  state?: string;

  @Prop({ trim: true })
  zipCode?: string;

  @Prop()
  latitude?: number;

  @Prop()
  longitude?: number;

  @Prop({ type: [OpeningHourSchema], default: [] })
  openingHours: OpeningHour[];

  @Prop({ type: [DishSchema], default: [] })
  menu: Dish[];

  @Prop({ default: 0, min: 0, max: 5 })
  rating: number;

  @Prop({ type: [ReviewSchema], default: [] })
  reviews: Review[];
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
