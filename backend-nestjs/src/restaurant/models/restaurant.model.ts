import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { OpeningHour } from './opening-hour.model';
import { Review } from './review.model';
import { Dish } from './dish.model';

@ObjectType()
export class Restaurant {
  @Field(() => ID)
  _id?: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [String])
  imageUrls: string[];

  @Field(() => ID)
  owner: string;

  @Field({ nullable: true })
  phoneNumber: string;

  @Field({ nullable: true })
  address: string;

  @Field({ nullable: true })
  city: string;

  @Field({ nullable: true })
  state: string;

  @Field({ nullable: true })
  zipCode: string;

  @Field(() => Float, { nullable: true })
  latitude?: number;

  @Field(() => Float, { nullable: true })
  longitude?: number;

  @Field(() => [OpeningHour])
  openingHours: OpeningHour[];

  @Field(() => [Dish])
  menu: Dish[];

  @Field(() => [Review])
  reviews: Review[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
