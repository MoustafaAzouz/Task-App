export declare class ScrapService {
    private driver;
    constructor();
    scrapeLinkedInProfile(url: string): Promise<{
        name: string;
        location: string;
        url: string;
        image: string;
    }>;
    loginToLinkedIn(email: string, password: string): Promise<void>;
}
