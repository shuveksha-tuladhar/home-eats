import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { CreateOrderInput } from './dto/create-order.input';
import { OrderResponse } from './dto/order.response';
import { UserService } from '../user/user.service';
import { RestaurantService } from '../restaurant/restaurant.service';
import { OpeningHour } from 'src/restaurant/models/opening-hour.model';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    private userService: UserService,
    private restaurantService: RestaurantService,
  ) {}

  async create(createOrderInput: CreateOrderInput): Promise<OrderDocument> {
    if (!Types.ObjectId.isValid(createOrderInput.userId)) {
      throw new BadRequestException(
        `Invalid User ID: ${createOrderInput.userId}`,
      );
    }
    if (!Types.ObjectId.isValid(createOrderInput.restaurantId)) {
      throw new BadRequestException(
        `Invalid Restaurant ID: ${createOrderInput.restaurantId}`,
      );
    }

    const createdOrder = new this.orderModel(createOrderInput);
    return createdOrder.save();
  }

  async findAll(): Promise<OrderDocument[]> {
    return this.orderModel.find().exec();
  }

  async findOne(id: string): Promise<OrderDocument | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Invalid Order ID: ${id}`);
    }
    const order = await this.orderModel.findById(id).exec();
    if (!order) {
      throw new NotFoundException(`Order with ID "${id}" not found.`);
    }
    return order;
  }

  async findOrdersByUser(userId: string): Promise<OrderDocument[]> {
    if (!Types.ObjectId.isValid(userId)) {
      throw new BadRequestException(`Invalid User ID: ${userId}`);
    }
    return this.orderModel.find({ userId: userId }).exec();
  }

  async findOrdersByRestaurant(restaurantId: string): Promise<OrderDocument[]> {
    if (!Types.ObjectId.isValid(restaurantId)) {
      throw new BadRequestException(`Invalid Restaurant ID: ${restaurantId}`);
    }
    return this.orderModel.find({ restaurantId: restaurantId }).exec();
  }

  async orderDetails(id: string): Promise<OrderResponse | null> {
    const order = await this.orderModel.findById(id).exec();
    if (order) {
      const user = await this.userService.findOneById(order.userId);
      const restaurant = await this.restaurantService.findOne(
        order.restaurantId,
      );

      const dishDetails = [];
      order.dishes.forEach((dish) => {
        const dishInfo = restaurant.menu.find(
          (menuItem) => menuItem._id.toString() === dish.dishId.toString(),
        );
        if (dishInfo) {
          dishDetails.push({
            _id: dishInfo._id,
            name: dishInfo.name,
            price: dish.price,
            quantity: dish.quantity,
            imageUrl: dishInfo.imageUrls ? dishInfo.imageUrls[0] : null,
          });
        }
      });

      return {
        _id: order._id,
        address: order.address,
        city: order.city,
        state: order.state,
        amount: order.amount,
        paymentToken: order.paymentToken,
        status: order.status,
        orderDate: order.createdAt,
        user: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          address: user.addresses[0]?.address || '',
          city: user.addresses[0]?.city || '',
          state: user.addresses[0]?.state || '',
          zipcode: user.addresses[0]?.zipCode || '',
        },
        restaurant: {
          _id: restaurant._id,
          name: restaurant.name,
          address: restaurant.address,
          city: restaurant.city,
          state: restaurant.state,
          zipcode: restaurant.zipCode,
          phoneNumber: restaurant.phoneNumber,
          latitude: restaurant.latitude,
          longitude: restaurant.longitude,
          openingHours: this.computeOpeningHours(restaurant.openingHours),
          imageUrl: restaurant.imageUrls ? restaurant.imageUrls[0] : null,
        },
        dishes: dishDetails,
      };
    }
  }

  computeOpeningHours(openingHours: Array<OpeningHour>): string {
    const today = new Date();
    const currentDay = today.getDay();
    const dayNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const todayName = dayNames[currentDay];

    const todayOpening = openingHours.find(
      (oh) => oh.day.toLowerCase() === todayName.toLowerCase(),
    );

    if (todayOpening && todayOpening.open && todayOpening.close) {
      return `${todayOpening.open} - ${todayOpening.close}`;
    }
    return 'Closed';
  }
}
