import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class OpeningHour {
  @Prop({
    required: true,
    enum: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
  })
  day: string;

  @Prop({ required: true, match: /^([01]\d|2[0-3]):([0-5]\d)$/ }) // HH:MM format
  open: string;

  @Prop({ required: true, match: /^([01]\d|2[0-3]):([0-5]\d)$/ }) // HH:MM format
  close: string;
}

export const OpeningHourSchema = SchemaFactory.createForClass(OpeningHour);

export default OpeningHourSchema;
