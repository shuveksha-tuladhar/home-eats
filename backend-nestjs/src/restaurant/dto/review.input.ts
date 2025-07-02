import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class ReviewInput {
  @Field(() => ID, { nullable: true })
  _id?: string;

  @Field()
  rating: number;

  @Field({ nullable: true })
  comment?: string;

  @Field(() => ID)
  user: string;

  @Field()
  username: string;
}
