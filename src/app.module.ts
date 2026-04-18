import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LlmModule } from './llm/llm.module';
import { MongoDBModule } from './mongo-db/mongo-db.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [LlmModule,
    MongooseModule.forRoot('')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
