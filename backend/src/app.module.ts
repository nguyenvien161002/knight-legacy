import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { KnightsModule } from './modules/knights/knights.module';
import { MongooseModule } from '@nestjs/mongoose';
import { env } from './configs/environment-variable';
import { LoggerMiddleware } from './middlewares/logger.middleware';

@Module({
  imports: [
    MongooseModule.forRoot(env.mongodb.stringConnect, {
      dbName: 'KnightMarket',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    KnightsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
