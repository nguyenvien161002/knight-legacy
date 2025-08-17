import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type KnightDocument = Knight & Document;

@Schema({
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  versionKey: false,
  timestamps: true,
})
export class Knight {
  @Prop({ required: true })
  name: string;

  @Prop()
  dna: string;

  @Prop({ required: true })
  knightID: number;

  @Prop({ required: true })
  level: number;

  @Prop({ required: true })
  attackTime: number;

  @Prop({ required: true })
  sexTime: number;

  @Prop({ default: 0 })
  winCount: number;

  @Prop({ default: 0 })
  lostCount: number;

  @Prop({
    set: (userAddress: string) => userAddress.toLowerCase(),
  })
  owner: string;

  @Prop({ required: true })
  tokenURI: string;

  @Prop({ required: true })
  image: string;

  @Prop({ default: false })
  isSalling: boolean;

  @Prop({ required: true })
  permaLink: string;

  @Prop({ default: false })
  maritalStatus: boolean;
}

export const KnightSchema = SchemaFactory.createForClass(Knight);

// // Virtuals
// KnightSchema.virtual('saleKnight', {
//   ref: 'sale_knight',
//   localField: 'knightID',
//   foreignField: 'knightID',
//   justOne: true,
// });
