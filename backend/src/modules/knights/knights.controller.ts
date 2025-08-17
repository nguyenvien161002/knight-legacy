import { Controller, Get, Post, Body } from '@nestjs/common';
import { KnightsService } from './knights.service';
import { CreateKnightDto } from './dto/create-knight.dto';

@Controller('api/v1/knights')
export class KnightsController {
  constructor(private readonly knightsService: KnightsService) {}

  @Post()
  create(@Body() createKnightDto: CreateKnightDto) {
    return this.knightsService.create(createKnightDto);
  }

  @Get()
  findAll() {
    return this.knightsService.findAll();
  }

  @Get('/sale')
  async getKnightForSale() {
    return {
      listSaleKnight: await this.knightsService.findAll(),
    };
  }
}
