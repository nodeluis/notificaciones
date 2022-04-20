import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export const initSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle("API")
    .setDescription("My API")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("notify", app, document);
};