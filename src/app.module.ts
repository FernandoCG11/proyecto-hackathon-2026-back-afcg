import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LlmModule } from './llm/llm.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [LlmModule,
    MongooseModule.forRoot('mongodb+srv://hackathon-user:QOs6m2rgGrjHS00t@hackathon-2026.srsbxjz.mongodb.net/hackathon-2026'),
    UserModule,
    TransactionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
