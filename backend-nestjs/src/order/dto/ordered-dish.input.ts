import { InputType, Field, Float, ID } from '@nestjs/graphql';

@InputType()
export class OrderedDishInput {
  @Field(() => ID)
  dishId: string;

  @Field()
  name: string;

  @Field(() => Float)
  price: number;

  @Field()
  quantity: number;
}
