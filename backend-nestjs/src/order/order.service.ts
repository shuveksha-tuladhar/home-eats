import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
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
    return this.orderModel.find({ user: userId }).exec();
  }

  async findOrdersByRestaurant(restaurantId: string): Promise<OrderDocument[]> {
    if (!Types.ObjectId.isValid(restaurantId)) {
      throw new BadRequestException(`Invalid Restaurant ID: ${restaurantId}`);
    }
    return this.orderModel.find({ restaurant: restaurantId }).exec();
  }

  async update(updateOrderInput: UpdateOrderInput): Promise<OrderDocument> {
    const { _id, ...updateData } = updateOrderInput;
    if (!Types.ObjectId.isValid(_id)) {
      throw new BadRequestException(`Invalid Order ID: ${_id}`);
    }

    const updatedOrder = await this.orderModel
      .findByIdAndUpdate(
        _id,
        { $set: updateData },
        { new: true, runValidators: true },
      )
      .exec();

    if (!updatedOrder) {
      throw new NotFoundException(`Order with ID "${_id}" not found.`);
    }
    return updatedOrder;
  }

  async remove(id: string): Promise<OrderDocument | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Invalid Order ID: ${id}`);
    }
    const deletedOrder = await this.orderModel.findByIdAndDelete(id).exec();
    if (!deletedOrder) {
      throw new NotFoundException(`Order with ID "${id}" not found.`);
    }
    return deletedOrder;
  }
}
