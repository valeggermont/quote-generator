import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'

import { apiSecret, testPasswordHash, testUserName } from '../constants/api.constants'
import { ApiError } from '../errors/api.error'

/**
 * Services related to Authentication
 */
export class AuthenticationService {

    /**
     * 
     * @param username 
     * @param password 
     * @returns JWT token for authenticated request
     * @throws API error if credentials are wrong
     */
    public login(username: string, password: string): string {
        const passwordValid = bcrypt.compareSync(password, testPasswordHash)
        if(username !== testUserName || !passwordValid) {
            throw new ApiError('Invalid password', 401)
        }
        return jwt.sign({
            username
        }, apiSecret, { expiresIn: 86400})
    }

    /**
     * 
     * @param token token to check if it's correct user
     * @returns true if token is correct, false otherwise
     */
    public verifyToken(token: string): Promise<boolean> {
        return new Promise((resolve) => {
            jwt.verify(token, apiSecret, (err, decode) => {
                if(err) resolve(false)
                else {
                    resolve(decode && 
                        (decode as JwtPayload).username && 
                        (decode as JwtPayload).username === testUserName)
                }
            })
        })
    }
}