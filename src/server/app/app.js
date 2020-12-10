
import Express from 'express'
import bodyParser from 'body-parser'
import viewIndex from './routes/view-index'
import morgan from 'morgan'
import { resolve } from 'path'
import rcAuth from './routes/rc-auth'
import staticRoute from './routes/static'

const app = new Express()
const {
  APP_HOME = '/'
} = process.env

staticRoute(app)
app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('views', resolve(__dirname, '../views'))
app.set('view engine', 'pug')

app.get('/test', (req, res) => res.send('server running'))
app.get('/rc-oauth', rcAuth)
app.get(APP_HOME, viewIndex('index'))

export default app
