import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReportService } from './report.service';

@Controller()
export class ReportController {
  constructor(private readonly reportService: ReportService) { }

  @Post('users/:userId/reports/generate-monthly')
  generateMonthlyReport(@Param('userId') userId: string) {
    return this.reportService.generateMonthly(userId);
  }


  @Get('users/:userId/reports')
  findAllByUser(@Param('userId') userId: string) {
    return this.reportService.findAllByUser(userId);
  }
}
