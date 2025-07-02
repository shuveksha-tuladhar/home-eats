import { InputType, Field, ID, PartialType, OmitType } from '@nestjs/graphql';
import { CreateOrderInput } from './create-order.input';

@InputType()
export class UpdateOrderInput extends PartialType(
  OmitType(CreateOrderInput, ['userId', 'restaurantId'] as const),
) {
  @Field(() => ID)
  _id: string;
}
