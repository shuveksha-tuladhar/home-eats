import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import * as jwt from 'jsonwebtoken';

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

  async findOneByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
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

  async validateUser(
    identifier: string,
    password: string,
  ): Promise<UserDocument | null> {
    const user = await this.userModel
      .findOne({
        $or: [{ email: identifier }, { username: identifier }],
      })
      .exec();
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async generateJwt(user: UserDocument): Promise<string> {
    const payload = { sub: user._id, email: user.email };
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });
    return token;
  }

  async verifyJwt(token: string): Promise<any> {
    try {
      const secret = process.env.JWT_SECRET;
      const payload = jwt.verify(token, secret);
      return payload;
    } catch (e) {
      console.log('JWT Error on verification:', e);
      return null;
    }
  }
}
