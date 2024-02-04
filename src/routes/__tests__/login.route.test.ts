import supertest from 'supertest'

import { App } from '../../app'
import { ApiError } from '../../errors/api.error'
import { AuthenticationService } from '../../services/authentication.service'
import { LoginRoute } from '../login.route'

describe.each([
    ['test', 'test', 200, 'myToken'],
    ['test', 'test', 403, undefined],
    [undefined, 'test', 400, undefined],
    ['test', undefined, 400, undefined]
])('When username is %s, password is %s', (username, password, status, token) => {

    const mockLogin = jest.spyOn(AuthenticationService.prototype, 'login')

    beforeEach(() => {
        if(status === 200) {
            mockLogin.mockReturnValue(token as string)
        } else if(status === 403) {
            mockLogin.mockImplementation(() => { throw new ApiError('Oops, credentials wrong', status) })
        }
    })

    test(`Then response status should be ${status}`, async () => {

        const response = await supertest(new App([new LoginRoute()]).app).post('/api/login').send({username, password})

        expect(response.status).toBe(status)

        if(status === 200) {
            expect(response.body.accessToken).toBe(token)
        }
    })

})