import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Owner } from './owner.schema';
import { Document } from 'mongoose';

export type CatDocument = Cat & Document;

@Schema()
export class Cat {
  @Prop({ required: true })
  name: string;

  @Prop()
  age: number;

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' })
  // owners: Owner[];
}

export const CatSchema = SchemaFactory.createForClass(Cat);
