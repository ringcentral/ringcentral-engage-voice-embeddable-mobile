/**
 * static route
 */
import Express from 'express'
import { resolve } from 'path'

export default (app) => {
  const staticPath = resolve(__dirname, '../../dist/static')
  const staticPath1 = resolve(process.cwd(), 'platforms')
  const staticPath2 = resolve(process.cwd(), 'deploy/embeddable')
  app.use(Express.static(staticPath))
  app.use(Express.static(staticPath1))
  app.use('/embeddable', Express.static(staticPath2))
}
