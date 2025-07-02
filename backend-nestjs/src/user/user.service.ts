import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input copy';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(input: CreateUserInput): Promise<UserDocument> {
    const created = new this.userModel(input);
    return created.save();
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async findOneById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }

  async update(input: UpdateUserInput): Promise<UserDocument> {
    const { _id, ...updateData } = input;
    const updatedUser = await this.userModel
      .findByIdAndUpdate(
        _id,
        { $set: updateData },
        { new: true, runValidators: true },
      )
      .exec();
    return updatedUser;
  }
}
