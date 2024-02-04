import 'dotenv/config'

import { App } from './src/app'
import { LoginRoute } from './src/routes/login.route'
import { QuoteRoute } from './src/routes/quote.route'

const quoteRoute = new QuoteRoute()
const loginRoute = new LoginRoute()

const app = new App([quoteRoute, loginRoute])

app.listen()