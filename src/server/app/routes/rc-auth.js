/**
 * rc oauth
 */

const {
  APP_HOME
} = process.env

export default async (req, res) => {
  const { code, state } = req.query
  const r = state.includes('ios') ? '/ios' : APP_HOME
  res.redirect(r + `?c=${code}`)
}
