import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Knight, KnightDocument } from './schemas/knights.schema';
import { Model } from 'mongoose';

@Injectable()
export class KnightsService {
  constructor(
    @InjectModel(Knight.name) private knightModel: Model<KnightDocument>,
  ) {}

  async create(data: Partial<Knight>): Promise<Knight> {
    const knight = new this.knightModel(data);
    return knight.save();
  }

  async findAll(): Promise<Knight[]> {
    return this.knightModel.find().limit(4).exec();
  }
}
