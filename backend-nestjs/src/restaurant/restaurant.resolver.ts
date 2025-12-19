import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Restaurant } from './models/restaurant.model';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantInput } from './dto/create-restaurant.input';
import { UpdateRestaurantInput } from './dto/update-restaurant.input';

@Resolver(() => Restaurant)
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Mutation(() => Restaurant)
  async createRestaurant(
    @Args('input') createRestaurantInput: CreateRestaurantInput,
  ): Promise<Restaurant> {
    return this.restaurantService.create(createRestaurantInput);
  }

  @Query(() => [Restaurant], { name: 'restaurants' })
  async findAllRestaurants(): Promise<Restaurant[]> {
    return this.restaurantService.findAll();
  }

  @Query(() => Restaurant, { name: 'restaurant' })
  async findOneRestaurant(@Args('id') id: string): Promise<Restaurant> {
    return this.restaurantService.findOne(id);
  }

  @Query(() => [Restaurant], { name: 'restaurantsByLocation' })
  async findRestaurantsByLocation(
    @Args('location') location: string,
  ): Promise<Restaurant[]> {
    return this.restaurantService.findByLocation(location);
  }

  @Mutation(() => Restaurant)
  async updateRestaurant(
    @Args('input') updateRestaurantInput: UpdateRestaurantInput,
  ): Promise<Restaurant> {
    return this.restaurantService.update(updateRestaurantInput);
  }

  @Mutation(() => Restaurant)
  async removeRestaurant(@Args('id') id: string): Promise<Restaurant> {
    return this.restaurantService.remove(id);
  }
}
