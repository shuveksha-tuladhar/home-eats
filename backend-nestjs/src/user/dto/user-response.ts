import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserResponseDto {
  @Field(() => String)
  jwt: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  email: string;
}

@ObjectType()
export class LoggedUserDto {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  email: string;
}
