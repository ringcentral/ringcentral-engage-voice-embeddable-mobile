/**
 * static route
 */
import Express from 'express'
import { resolve } from 'path'

export default (app) => {
  const staticPath = resolve(__dirname, '../../dist/static')
  const staticPath4 = resolve(process.cwd(), 'platforms')
  app.use(Express.static(staticPath))
  app.use(Express.static(staticPath4))
}
