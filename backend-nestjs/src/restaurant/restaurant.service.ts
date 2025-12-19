import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Restaurant, RestaurantDocument } from './schemas/restaurant.schema';
import { CreateRestaurantInput } from './dto/create-restaurant.input';
import { UpdateRestaurantInput } from './dto/update-restaurant.input';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel(Restaurant.name)
    private restaurantModel: Model<RestaurantDocument>,
  ) {}

  async create(
    createRestaurantInput: CreateRestaurantInput,
  ): Promise<RestaurantDocument> {
    const createdRestaurant = new this.restaurantModel(createRestaurantInput);
    return createdRestaurant.save();
  }

  async findAll(): Promise<RestaurantDocument[]> {
    return this.restaurantModel.find().exec();
  }

  async findOne(id: string): Promise<RestaurantDocument | null> {
    const restaurant = await this.restaurantModel.findById(id).exec();
    if (!restaurant) {
      throw new NotFoundException(`Restaurant with ID "${id}" not found.`);
    }
    return restaurant;
  }

  async update(
    updateRestaurantInput: UpdateRestaurantInput,
  ): Promise<RestaurantDocument> {
    const { _id, ...updateData } = updateRestaurantInput;

    const updatedRestaurant = await this.restaurantModel
      .findByIdAndUpdate(
        _id,
        { $set: updateData },
        { new: true, runValidators: true },
      )
      .exec();

    if (!updatedRestaurant) {
      throw new NotFoundException(`Restaurant with ID "${_id}" not found.`);
    }
    return updatedRestaurant;
  }

  async remove(id: string): Promise<RestaurantDocument | null> {
    const deletedRestaurant = await this.restaurantModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedRestaurant) {
      throw new NotFoundException(`Restaurant with ID "${id}" not found.`);
    }
    return deletedRestaurant;
  }

  async findByLocation(location: string): Promise<RestaurantDocument[]> {
    if (!location || !location.trim()) {
      return this.restaurantModel.find().exec();
    }
    const parts = location.split(',').map((part) => part.trim());
    const query: any = {};

    query.city = parts[0];
    query.state = parts[1];

    return this.restaurantModel.find(query).exec();
  }
}
