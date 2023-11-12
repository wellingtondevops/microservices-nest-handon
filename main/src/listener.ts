import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {

  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqps://xdcjhjem:K_71cgMgEGZh-Yr0yqWQg8sUAIFRAeoh@kebnekaise.lmq.cloudamqp.com/xdcjhjem'],
      queue: 'main_queue',
      queueOptions: {
        durable: false
      },
    },
  });

  
await app.listen(); // ou app.listen()

  console.log('Listen micro-service main_queue');

}
bootstrap();
