import { Router } from 'express'

/**
 * Model defining base members of a route
 */
export class Route {

    constructor(
        public router: Router,
        public path?: string
    ) {}
}