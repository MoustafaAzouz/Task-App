"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrapController = void 0;
const common_1 = require("@nestjs/common");
const scrap_service_1 = require("./scrap.service");
let ScrapController = class ScrapController {
    constructor(scrapService) {
        this.scrapService = scrapService;
    }
    async scrapeLinkedInProfile(url) {
        await this.scrapService.loginToLinkedIn(process.env.LINKEDIN_EMAIL, process.env.LINKEDIN_PASSWORD);
        return await this.scrapService.scrapeLinkedInProfile(url);
    }
};
exports.ScrapController = ScrapController;
__decorate([
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Query)('url')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ScrapController.prototype, "scrapeLinkedInProfile", null);
exports.ScrapController = ScrapController = __decorate([
    (0, common_1.Controller)('MyLinkedin'),
    __metadata("design:paramtypes", [scrap_service_1.ScrapService])
], ScrapController);
//# sourceMappingURL=scrap.controller.js.map