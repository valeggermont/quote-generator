import { Request, Response } from 'express'

import { ApiError } from '../errors/api.error'
import { QuoteService } from '../services/quote.service'

/**
 * Controller related to quote API
 */
export class QuoteController {

    private service = new QuoteService()

    public async getQuote(req: Request, res: Response) {

        try {
            const quote = await this.service.getRandom(req.query.author as string, req.query.tag ? (req.query.tag as string).split(',') : undefined)
            res.status(200).json(quote)
        } catch (e) {
            const error = e as ApiError
            console.error(error.message)
            res.status(error.code).json({
                message: error.msg
            })
        }

    }

    public async getTags(req: Request, res: Response) {
        try {
            const tags = await this.service.getTags()
            res.status(200).json(tags)
        } catch (e) {
            const error = e as ApiError
            console.error(error.message)
            res.status(error.code).json({
                message: error.msg
            })
        }
    }
}