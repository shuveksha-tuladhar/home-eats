import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class OpeningHour {
  @Field()
  day: string;

  @Field()
  open: string;

  @Field()
  close: string;
}
