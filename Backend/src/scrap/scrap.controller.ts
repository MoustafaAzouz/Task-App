import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ScrapService } from './scrap.service';

@Controller('MyLinkedin')
export class ScrapController {
  constructor(private scrapService: ScrapService) {}

  @Get('')
  async scrapeLinkedInProfile(
    @Query('url') url: string,
  ): Promise<{
    name: string;
    location: string;
    url: string;
    image: string;
  }> {
    await this.scrapService.loginToLinkedIn(
      process.env.LINKEDIN_EMAIL,
      process.env.LINKEDIN_PASSWORD,
    );
    return await this.scrapService.scrapeLinkedInProfile(url);
  }
}
