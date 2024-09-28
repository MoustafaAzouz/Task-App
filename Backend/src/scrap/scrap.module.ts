import { Module } from '@nestjs/common';
import { ScrapService } from './scrap.service';
import { ScrapController } from './scrap.controller';
import { PassportModule } from '@nestjs/passport/dist/passport.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports :[AuthModule, PassportModule],
  controllers: [ScrapController],
  providers: [ScrapService],
})
export class ScrapModule {}
