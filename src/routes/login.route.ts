import { Router } from 'express'

import { AuthenticationController } from '../controllers/authentication.controller'
import { Route } from '../models/route.model'

/**
 * Route for login
 */
export class LoginRoute implements Route {

    public path = '/login'
    public router = Router()
    public controller = new AuthenticationController()


    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.post(`${this.path}`, (req, res) => this.controller.login(req, res))
    }

}