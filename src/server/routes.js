import root from 'node-root'
const assets = require(root('webpack-assets.json'))
const routes = {}

routes.index = (req, res) => {
  res.render('index', {
    msg: 'hi',
    assets: assets
  })
}

export default routes
