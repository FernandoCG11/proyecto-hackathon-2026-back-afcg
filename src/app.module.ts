import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LlmModule } from './llm/llm.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { TransactionModule } from './transaction/transaction.module';
import { TaxProfileModule } from './tax-profile/tax-profile.module';
import { CommonModule } from './common/common.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformResponseInterceptor } from './common/interceptors/transform-response.interceptor';
import { ReportModule } from './report/report.module';

@Module({
  imports: [LlmModule,
    MongooseModule.forRoot('mongodb+srv://hackathon-user:QOs6m2rgGrjHS00t@hackathon-2026.srsbxjz.mongodb.net/hackathon-2026'),
    UserModule,
    TransactionModule,
    TaxProfileModule,
    CommonModule,
    ReportModule
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_INTERCEPTOR, useClass: TransformResponseInterceptor }],
})
export class AppModule { }
