import {useState, useEffect} from 'react'
import { Quote } from '../models/quote.model'
import { QuoteService } from '../services/quote.service'
import { useRecoilValue } from 'recoil'
import { tokenAtom } from '../atoms/token.atom'
import { useNavigate } from 'react-router-dom'
import { InvalidTokenError } from '../errors/invalidToken.error'

export class QuoteIterator {

    private tag = ''

    constructor(
        private token: string
    ) {}

    public setTag(value: string) {
        this.tag = value
    }

    public async next(): Promise<Quote> {
        return QuoteService.getRandomQuote(this.token, this.tag)
    }


}

export const useQuote  = (tagState: string) => {

    const [iterator, setIterator] = useState<QuoteIterator|null>(null)
    const [quote, setQuote] = useState<Quote | null>(null)
    const [probing, setProbing] = useState<boolean>(false)

    const token = useRecoilValue(tokenAtom)
    const navigate = useNavigate()

    useEffect(() => {
        const _iterator = new QuoteIterator(token)
        _iterator.setTag(tagState)
        setIterator(_iterator)
    }, [tagState, token])

    useEffect(() => {
        if(!quote) {
            next()
        }
    }, [iterator, quote])

    const next = () => {
        setProbing(true)
        iterator?.next()
            .then(setQuote)
            .catch(e => {
                if (e instanceof InvalidTokenError) {
                    navigate('/')
                } else {
                    console.error(e)
                }
            })
            .finally(() => setProbing(false))
    }

    return {next, quote, probing}
}