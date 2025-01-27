import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.FRONTEND_URL,
    methods: 'GET, POST, PUT, DELETE,PATCH',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
});

  //Custom Swagger configuration
  const config = new DocumentBuilder()
  .setTitle('Notify Api')
  .setDescription('API for Notify application')
  .setVersion('1.0.0')
  .addTag('Applications API')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);
  
  await app.listen(3000);
}
bootstrap();
