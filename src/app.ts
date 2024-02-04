import express, { Application } from 'express'

import { Route } from './models/route.model'

/**
 * Node App
 */
export class App {

    public app: Application
    public port: string | number

    constructor(routes: Route[]) {
        this.app = express()
        this.port = process.env.PORT || 3000

        this.app.use(express.static('public'))
        this.app.use(express.json())

        routes.forEach(route => {
            
            this.app.use('/api', route.router)
            
        })
    }
    
    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running at http://localhost:${this.port}`)
        })
    }
    

}