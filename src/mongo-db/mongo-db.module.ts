import { Module } from '@nestjs/common';
import { MongoDbService } from './mongo-db.service';

@Module({
  providers: [MongoDbService]
})
export class MongoDBModule { }
