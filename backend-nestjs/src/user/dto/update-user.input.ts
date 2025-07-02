import { InputType, Field, PartialType, ID, OmitType } from '@nestjs/graphql';
import { CreateUserInput } from './create-user.input';

@InputType()
export class UpdateUserInput extends PartialType(
  OmitType(CreateUserInput, ['password'] as const),
) {
  @Field(() => ID)
  _id: string;
}
