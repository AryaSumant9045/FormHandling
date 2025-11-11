import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()
const port = 3000

app.use(cors())

// preserve raw body for debugging
const saveRaw = (req, res, buf) => {
  try {
    req.rawBody = buf && buf.toString ? buf.toString() : ''
  } catch (e) {
    req.rawBody = ''
  }
}

// JSON parser (also saves raw)
app.use(bodyParser.json({ verify: saveRaw, limit: '1mb' }))

// urlencoded parser for normal HTML forms
app.use(bodyParser.urlencoded({ extended: true, verify: saveRaw, limit: '1mb' }))

// Optional: log every incoming request briefly
app.use((req, res, next) => {
  console.log('--- Incoming request ---')
  console.log('method:', req.method, 'url:', req.url)
  console.log('headers:', req.headers)
  // don't print huge bodies in prod
  next()
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/', (req, res) => {
  console.log('--- route / POST ---')
  console.log('Content-Type header:', req.headers['content-type'])
  console.log('rawBody:', req.rawBody)
  console.log('parsed req.body:', req.body)
  res.json({ ok: true, received: req.body, raw: req.rawBody })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})