import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1', // Alterado de 'localhost' para '127.0.0.1'
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'nest_admin',
      autoLoadEntities: true,
      entities: [],
      synchronize: true,
    }),
    ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
