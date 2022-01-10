import express from 'express'

const PORT = 8000

const app = express()

app.get('/hello', (req, res) => {
  // res.status(201).json({ success: true })
  // res.download('/test.pdf', 'tessst.pdf')
  // res.redirect(301, 'https://example.com')
  // Headers
  // res.set('Content-Type', 'text/plain')
  // res.append('Warning', 'code')
  // res.type('application/json')
  // res.location('url')
  // res.links({ next: 'https://link', lastLink: 'https://link' })
  // Cookies
  // res.cookie('cookieName', 'shifr', { domain: '', path: '/', secure: true, expires: 600000 })
  // res.clearCookie('cookieName', { path: '/' })

  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Server run on: http://localhost:${PORT}`)
})
