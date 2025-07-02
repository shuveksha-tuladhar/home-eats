import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { Order } from './models/order.model';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Mutation(() => Order)
  async createOrder(
    @Args('input') createOrderInput: CreateOrderInput,
  ): Promise<Order> {
    return this.orderService.create(createOrderInput);
  }

  @Query(() => [Order])
  async findAllOrders(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @Query(() => Order)
  async findOneOrder(@Args('id') id: string): Promise<Order | null> {
    return this.orderService.findOne(id);
  }

  @Query(() => [Order])
  async findOrdersByUser(@Args('userId') userId: string): Promise<Order[]> {
    return this.orderService.findOrdersByUser(userId);
  }

  @Query(() => [Order])
  async findOrdersByRestaurant(
    @Args('restaurantId') restaurantId: string,
  ): Promise<Order[]> {
    return this.orderService.findOrdersByRestaurant(restaurantId);
  }

  @Mutation(() => Order)
  async updateOrder(
    @Args('input') updateOrderInput: UpdateOrderInput,
  ): Promise<Order> {
    return this.orderService.update(updateOrderInput);
  }

  @Mutation(() => Order)
  async removeOrder(@Args('id') id: string): Promise<Order | null> {
    return this.orderService.remove(id);
  }
}
