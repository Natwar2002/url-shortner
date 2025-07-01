import UrlRepository from "@/repositories/UrlRepository";
import shortId from 'shortid';

export class UrlShortnerService {
    private urlRepository; 
    constructor() {
        this.urlRepository = new UrlRepository();
    }

    async shortenUrl(originalUrl: string) : Promise<string> {
        let url = await this.urlRepository.getUrlByOriginalUrl(originalUrl);
        if(url) {
            return url?.shortUrl;
        }

        let shortUrl = shortId();
        url = await this.urlRepository.getUrlByShortUrl(shortUrl); 
        while(url) {
            shortUrl = shortId();
            url = await this.urlRepository.getUrlByOriginalUrl(shortUrl);
        }

        await this.urlRepository.createUrl(originalUrl, shortUrl);
        return shortUrl;
    }

    async getAllUrls() {
        return await this.urlRepository.getAllUrls();
    }

    async getUrlByShortUrl(shortenUrl: string) {
        return await this.urlRepository.getUrlByShortUrl(shortenUrl);
    }
    
}