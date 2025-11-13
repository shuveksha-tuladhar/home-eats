import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class Review {
  @Field(() => ID)
  _id?: string;

  @Field(() => Int)
  rating: number;

  @Field({ nullable: true })
  comment?: string;

  @Field(() => ID)
  user: string;

  @Field()
  username: string;

  @Field()
  commentedAt: Date;

  @Field()
  isFlagged: boolean;

  @Field()
  isApproved: boolean;
}
