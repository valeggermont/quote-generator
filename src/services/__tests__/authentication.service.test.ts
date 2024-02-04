import jwt from 'jsonwebtoken'

import { apiSecret } from '../../constants/api.constants'
import { ApiError } from '../../errors/api.error'
import { AuthenticationService } from '../authentication.service'

describe.each([
    ['optimusPrime', 'test', false],
    ['test', 'autobots', false],
    ['test', 'test', true]
])('When username is %s and password is %s', (username, password, success) => {

    const service = new AuthenticationService()

    test(`Then it should ${success ? '' : 'not '}succeed`, () => {
        if(success) {
            expect(service.login(username, password)).toBeDefined()
        } else {
            expect(() => service.login(username, password)).toThrow(ApiError)
        }
    })
})

describe.each([
    ['randomToken', false],
    [jwt.sign({username: 'test'}, apiSecret, { expiresIn: 86400}), true],
    [jwt.sign({username: 'optimusPrime'}, apiSecret, { expiresIn: 86400}), false],
])('When token is %s', (token, success) => {
    
    const service = new AuthenticationService()
    
    test(`Then it should ${success ? '' : 'not '}succeed`, async () => {
        await expect(service.verifyToken(token)).resolves.toBe(success)
    })
})

