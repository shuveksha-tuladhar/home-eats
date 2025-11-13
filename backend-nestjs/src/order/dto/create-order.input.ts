import { InputType, Field, Float, ID } from '@nestjs/graphql';
import { OrderedDishInput } from './ordered-dish.input';
import { OrderStatusEnum } from '../types/order-status';

@InputType()
export class CreateOrderInput {
  @Field()
  address: string;

  @Field()
  city: string;

  @Field()
  state: string;

  @Field(() => Float)
  amount: number;

  @Field()
  paymentToken: string;

  @Field(() => [OrderedDishInput])
  dishes: OrderedDishInput[];

  @Field(() => ID)
  userId: string;
  @Field(() => ID)
  restaurantId: string;

  @Field(() => OrderStatusEnum, { nullable: true })
  status?: OrderStatusEnum;
}
