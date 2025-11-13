import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Address {
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
