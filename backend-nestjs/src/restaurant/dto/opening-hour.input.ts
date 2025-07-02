import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class OpeningHourInput {
  @Field()
  day: string;

  @Field()
  open: string;

  @Field()
  close: string;
}
