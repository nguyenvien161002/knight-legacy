import { Module } from '@nestjs/common';
import { KnightsService } from './knights.service';
import { KnightsController } from './knights.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Knight, KnightSchema } from './schemas/knights.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Knight.name, schema: KnightSchema }]),
  ],
  controllers: [KnightsController],
  providers: [KnightsService],
})
export class KnightsModule {}
