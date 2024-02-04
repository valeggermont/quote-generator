import { ApiError } from '../errors/api.error'
import { Quote } from '../models/quote.model'
import { AxiosRequestBuilder, axiosClient, handleAxiosError } from '../utils/axios.util'

/**
 * Service related to querying Quote API
 */
export class QuoteService {

    /**
     * 
     * @param author Author of the requested quote
     * @param tags Tags accepted for the requested quotes
     * @returns a random quote, possible given a author and/or a set of accepted tags
     * @throws API error if given tags are invalid or if request to quote api fail
     */
    public async getRandom(author: string | undefined, tags?: string[]): Promise<Quote> {
        
        if(tags) {
            const existingTags = await this.getTags()
            const invalidTags = tags.filter(tag => !existingTags.includes(tag))
            if(invalidTags.length > 0) {
                throw new ApiError(`Following tags are invalid ${tags.join(',')}`, 400)
            }
        }
        
        const requestBuilder = new AxiosRequestBuilder()
        if(author) {
            requestBuilder.parameter('author', author)
        }
        if(tags) {
            requestBuilder.parameter('tags', tags.join('|'))
        }

        return (await(handleAxiosError(axiosClient.get<Quote[]>('/quotes/random', requestBuilder.build())))).data[0]
        
    }

    /**
     * 
     * @returns Quote API's tags
     * @throws API error if request quote api fail
     */
    public async getTags(): Promise<string[]> {
        return (await handleAxiosError(axiosClient.get<{name: string}[]>('/tags'))).data.map(tag => tag.name)
    }
}