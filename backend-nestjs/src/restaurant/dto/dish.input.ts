import { InputType, Field, Float, ID } from '@nestjs/graphql';
import { ReviewInput } from './review.input';

@InputType()
export class DishInput {
  @Field(() => ID, { nullable: true })
  _id?: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Float)
  price: number;

  @Field(() => [String], { nullable: true })
  imageUrls?: string[];

  @Field({ nullable: true })
  isActive?: boolean;

  @Field(() => [String], { nullable: true })
  categories?: string[];

  @Field(() => [String], { nullable: true })
  sides?: string[];

  @Field(() => Float, { nullable: true })
  rating?: number;

  @Field(() => [ReviewInput], { nullable: true })
  reviews?: ReviewInput[];
}
