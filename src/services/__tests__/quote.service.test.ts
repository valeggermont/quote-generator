import realAxios, { AxiosError } from 'axios'

import { castToMockAxios } from '../../__mocks__/axios'
import { ApiError } from '../../errors/api.error'
import { randomQuotes } from '../../mocks/quote.mock'
import { Quote } from '../../models/quote.model'
import { QuoteService } from '../quote.service'

jest.mock('axios')
const axios = castToMockAxios(realAxios)

describe.each([
    [500, undefined], 
    [200, ['tag1, tag2']]
])('When getting tags and returned status code is %s', (status, result) => {
    
    const service = new QuoteService()

    beforeEach(() => {
        if(status === 200) {
            axios.jestFns.get.mockResolvedValueOnce({data: result?.map(tag => ({name: tag}))})
        } else {
            axios.jestFns.get.mockRejectedValueOnce(new AxiosError('Oops', `${status}`))
        }
    })

    test(`Then result should be ${status === 200 ? result : 'Axios Error'}`, async () => {
        if(status === 200) {
            await expect(service.getTags()).resolves.toStrictEqual(result)
        } else {
            await expect(service.getTags()).rejects.toThrow(ApiError)
        }
    })
})

describe.each([
    [500, undefined, undefined, undefined],
    [200, undefined, undefined, randomQuotes],
    [500, undefined, ['NoFriendship'], undefined],
    [200, undefined, ['Friendship'], randomQuotes],
    [200, 'Confucius', ['Friendship'], randomQuotes]
])('When getting tags and returned status code is %s, author is %s and tag is %s', (status, author, tag, result) => {

    const service = new QuoteService()
    const getTags = jest.spyOn(service, 'getTags')

    beforeEach(() => {
        getTags.mockResolvedValue(['Friendship'])
        axios.jestFns.get.mockReset()
        if(status === 200) {
            axios.jestFns.get.mockResolvedValueOnce({data: result})
        } else {
            axios.jestFns.get.mockRejectedValueOnce(new AxiosError('Oops', `${status}`))
        }
    })

    test(`Then result should be ${status === 200 ? 'quote' : 'Axios Error'}`, async () => {
        if(status === 200) {
            await expect(service.getRandom(author, tag)).resolves.toStrictEqual((result as Quote[])[0])
        } else {
            await expect(service.getRandom(author, tag)).rejects.toThrow(ApiError)
        }
    })
})