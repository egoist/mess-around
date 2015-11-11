import 'babel-polyfill'
import express from 'express'
import body from 'body-parser'
import path from 'path'
import routes from './routes'

const app = express()
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.static('build'))
app.use(body.urlencoded({ extended: false }))
app.use(body.json())

app.get('/', routes.index)

app.listen(8030, () => {
  console.log('app is running at http://localhost:8030')
})
