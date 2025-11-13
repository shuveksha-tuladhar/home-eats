import { InputType, Field } from '@nestjs/graphql';
import { AddressInput } from './address.input';

@InputType()
export class CreateUserInput {
  @Field()
  firstName: string;

  @Field({ nullable: true })
  middleName?: string;

  @Field()
  lastName: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  phoneNumber: string;

  @Field(() => [AddressInput], { nullable: true })
  addresses: AddressInput[];
}
