import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class UserDetails {
  @Field(() => ID)
  _id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  address: string;

  @Field()
  city: string;

  @Field()
  state: string;

  @Field()
  zipcode: string;
}

@ObjectType()
export class RestaurantDetails {
  @Field(() => ID)
  _id: string;

  @Field()
  name: string;

  @Field()
  address: string;

  @Field()
  city: string;

  @Field()
  state: string;

  @Field()
  zipcode: string;

  @Field(() => Float)
  latitude: number;

  @Field(() => Float)
  longitude: number;

  @Field()
  openingHours: string;

  @Field({ nullable: true })
  imageUrl: string;
}

@ObjectType()
export class DishDetails {
  @Field(() => ID)
  _id: string;

  @Field()
  name: string;

  @Field(() => Float)
  price: number;

  @Field()
  quantity: number;

  @Field({ nullable: true })
  imageUrl: string;
}

@ObjectType()
export class OrderResponse {
  @Field(() => ID)
  _id: string;

  @Field()
  address: string;

  @Field()
  city: string;

  @Field()
  state: string;

  @Field(() => Float)
  amount: number;

  @Field()
  paymentToken: string;

  @Field()
  status: string;

  @Field()
  orderDate: Date;

  @Field(() => UserDetails)
  user: UserDetails;

  @Field(() => RestaurantDetails)
  restaurant: RestaurantDetails;

  @Field(() => [DishDetails])
  dishes: DishDetails[];
}
