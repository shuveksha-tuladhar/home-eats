import {
  ObjectType,
  Field,
  ID,
  Float,
  registerEnumType,
} from '@nestjs/graphql';
import { OrderedDish } from './ordered-dish.model';
import { OrderStatusEnum } from '../types/order-status';

registerEnumType(OrderStatusEnum, {
  name: 'OrderStatus',
  description: 'Current status of the order',
});

@ObjectType()
export class Order {
  @Field(() => ID)
  _id: string;

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

  @Field(() => [OrderedDish])
  dishes: OrderedDish[];

  @Field(() => ID)
  userId: string;

  @Field(() => ID)
  restaurantId: string;

  @Field(() => OrderStatusEnum)
  status: OrderStatusEnum;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
