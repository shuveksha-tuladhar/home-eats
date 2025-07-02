import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Address } from './address.model'; // Import the GraphQL Address type

@ObjectType()
export class User {
  @Field(() => ID)
  _id?: string;

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
  phoneNumber: string;

  @Field(() => [Address])
  addresses: Address[];

  @Field()
  isActive: boolean;

  @Field()
  role: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
