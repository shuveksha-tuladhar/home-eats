import { InputType, Field, Float, ID } from '@nestjs/graphql';
import { OpeningHourInput } from './opening-hour.input';
import { DishInput } from './dish.input';
import { ReviewInput } from './review.input';

@InputType()
export class CreateRestaurantInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [String], { nullable: true })
  imageUrls?: string[];

  @Field(() => ID)
  owner: string;

  @Field({ nullable: true })
  phoneNumber?: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  city?: string;

  @Field({ nullable: true })
  state?: string;

  @Field({ nullable: true })
  zipCode?: string;

  @Field(() => Float, { nullable: true })
  latitude?: number;

  @Field(() => Float, { nullable: true })
  longitude?: number;

  @Field(() => [OpeningHourInput], { nullable: true })
  openingHours?: OpeningHourInput[];

  @Field(() => [DishInput], { nullable: true })
  menu?: DishInput[];

  @Field(() => [ReviewInput], { nullable: true })
  reviews?: ReviewInput[];
}
