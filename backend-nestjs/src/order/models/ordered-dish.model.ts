import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class OrderedDish {
  @Field(() => ID, { nullable: true })
  _id?: string;

  @Field()
  dishId: string;

  @Field()
  name: string;

  @Field(() => Float)
  price: number;

  @Field()
  quantity: number;
}
