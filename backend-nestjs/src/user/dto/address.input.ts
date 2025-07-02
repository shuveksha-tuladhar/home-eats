import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AddressInput {
  @Field()
  address: string;

  @Field()
  city: string;

  @Field()
  state: string;

  @Field()
  zipCode: string;

  @Field({ defaultValue: false })
  isPrimary: boolean;
}
