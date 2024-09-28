import { ScrapService } from './scrap.service';
export declare class ScrapController {
    private scrapService;
    constructor(scrapService: ScrapService);
    scrapeLinkedInProfile(url: string): Promise<{
        name: string;
        location: string;
        url: string;
        image: string;
    }>;
}
