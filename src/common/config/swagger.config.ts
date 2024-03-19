import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
    .setTitle('Authentication API Document')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('auth')
    .addSecurity('Token', {
        type: 'http',
        scheme: 'bearer', // Specify the scheme as 'bearer'
        in: 'header',
        bearerFormat: 'JWT', // Specify the bearer format if needed
        name: 'Token' // Specify the header name
    }).build();
