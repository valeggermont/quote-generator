import { Router } from 'express'

import { AuthenticationController } from '../controllers/authentication.controller'
import { QuoteController } from '../controllers/quote.controller'
import { Route } from '../models/route.model'


export class QuoteRoute implements Route {

    public path = '/quote'
    public router = Router()
    public controller = new QuoteController()
    public authenticationController = new AuthenticationController()

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/random`, (req, res, next) => this.authenticationController.verifyToken(req, res, next), (req, res) => this.controller.getQuote(req, res))
        this.router.get(`${this.path}/tags`, (req, res, next) => this.authenticationController.verifyToken(req, res, next), (req, res) => this.controller.getTags(req, res))
    }

}
