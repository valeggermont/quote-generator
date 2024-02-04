import { InvalidTokenError } from '../errors/invalidToken.error'
import { Quote } from '../models/quote.model'

export class QuoteService {

    public static async getTags(token: string): Promise<string[]> {
        return this.fetchQuoteApi<string[]>('tags', token)
    }

    public static async getRandomQuote(token: string, tag: string): Promise<Quote> {
        let path = 'random'
        if(tag && tag.length > 0) {
            path += `?tag=${tag}`
        }
        return this.fetchQuoteApi<Quote>(path, token)
    }

    private static async fetchQuoteApi<T>(path: string, token: string): Promise<T> {

        const response = await fetch(`/api/quote/${path}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if(!response.ok) {
            if(response.status === 403) {
                throw new InvalidTokenError()
            } else {
                throw new Error(`Something went wrong while login - [${response.status}] ${response.statusText}`)
            }
        }

        return response.json()

    } 
}