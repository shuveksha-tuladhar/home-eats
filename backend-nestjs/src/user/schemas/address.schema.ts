import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface IAddressDocument extends Address, Document {}

@Schema()
export class Address {
  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  zipCode: string;

  @Prop({ default: false })
  isPrimary: boolean;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
