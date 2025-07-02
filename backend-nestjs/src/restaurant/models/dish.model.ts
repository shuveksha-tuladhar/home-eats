import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class Dish {
  @Field(() => ID)
  _id?: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Float)
  price: number;

  @Field(() => [String])
  imageUrls: string[];

  @Field()
  isActive: boolean;

  @Field(() => [String])
  categories: string[];

  @Field(() => [String])
  sides?: string[];
}
