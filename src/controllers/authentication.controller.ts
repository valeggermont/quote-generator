import { NextFunction, Request, Response } from 'express'

import { ApiError } from '../errors/api.error'
import { AuthenticationService } from '../services/authentication.service'

/**
 * Controller related to Authentication
 */
export class AuthenticationController {

    private service = new AuthenticationService()

    public login(req: Request, res: Response) {
        const { username, password } = req.body
        if(!username || !password) {
            res.status(400)
            res.end()
            return
        }
        
        try {
            const token = this.service.login(username, password)
            res.json({
                accessToken: token
            })
        } catch (e) {
            const error = e as ApiError
            console.error(error.message)
            res.status(error.code).json({
                message: error.msg
            })
        }
    }

    public async verifyToken(req:Request, res:Response, next: NextFunction) {
        
        if(!req.headers.authorization) {
            res.status(403)
            res.end()
            return
        }
        const token = req.headers.authorization.split(' ')[1]
        
        if(!token) {
            res.status(403)
            res.end()
            return
        }
        if(!(await this.service.verifyToken(token))) {
            res.status(403)
            res.end()
            return
        }

        next()


    }
}