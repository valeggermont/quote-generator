import supertest from 'supertest'

import { App } from '../../app'
import { ApiError } from '../../errors/api.error'
import { randomQuotes } from '../../mocks/quote.mock'
import { AuthenticationService } from '../../services/authentication.service'
import { QuoteService } from '../../services/quote.service'
import { QuoteRoute } from '../quote.route'


describe.each([
    ['/quote/random', 'getRandom', randomQuotes[0]],
    ['/quote/random?tag=Friendship', 'getRandom', randomQuotes[0]],
    ['/quote/tags', 'getTags', ['tag1', 'tag2']]
])('When hitting %s', (path, serviceMethod, successResult) => {

    const mockService = jest.spyOn(QuoteService.prototype, serviceMethod as keyof QuoteService)

    describe.each([
        [true, 'Bearer myToken', 200, successResult],
        [false, 'Bearer myToken', 403, undefined],
        [true, 'Bearer myToken', 500, undefined],
        [false, undefined, 403, undefined],
        [false, 'Bearer', 403, undefined]
    ])('When token validity is %s and authorization is %s', (tokenValid, authorization, status, body) => {

        const mockVerifyToken = jest.spyOn(AuthenticationService.prototype, 'verifyToken')
        
        beforeEach(() => {
        
            mockService.mockReset()
            mockVerifyToken.mockReset()

            mockVerifyToken.mockResolvedValue(tokenValid)
            
            if(status === 200 && body) {
                mockService.mockResolvedValueOnce(body)
            } else if(tokenValid) {
                mockService.mockRejectedValueOnce(new ApiError('Oops', status))
            }
        })

        test(`Then status should be ${status}`, async () => {
            
            const appQuery = supertest(new App([new QuoteRoute()]).app).get(`/api${path}`)

            if(authorization) {
                appQuery.set('Authorization', authorization)
            }

            const response = await appQuery

            expect(response.status).toBe(status)

            if(status === 200) {
                expect(response.body).toStrictEqual(body)
            }
        })

    })

})