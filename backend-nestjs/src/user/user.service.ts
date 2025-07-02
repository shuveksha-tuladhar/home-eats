import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(input: CreateUserInput): Promise<UserDocument> {
    const hashedPassword = await bcrypt.hash(input.password, 10);
    const userToSave = { ...input, password: hashedPassword };
    const created = new this.userModel(userToSave);
    return created.save();
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async findOneById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }

  async update(input: UpdateUserInput): Promise<UserDocument | null> {
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
