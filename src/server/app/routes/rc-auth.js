/**
 * rc oauth
 */

const {
  APP_HOME
} = process.env

export default async (req, res) => {
  const { code } = req.query
  res.redirect(APP_HOME + `?c=${code}`)
}
