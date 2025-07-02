import { InputType, Field, ID, PartialType, OmitType } from '@nestjs/graphql';
import { CreateRestaurantInput } from './create-restaurant.input';

@InputType()
export class UpdateRestaurantInput extends PartialType(
  OmitType(CreateRestaurantInput, ['owner'] as const),
) {
  @Field(() => ID)
  _id: string;
}
