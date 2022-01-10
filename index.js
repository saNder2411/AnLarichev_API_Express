import http from 'http'

const host = '127.0.0.1'

const port = 8000

const server = http.createServer((req, res) => {})

server.listen(port, host, () => {
  console.log(`Server run on: ${host}:${port}`)
})
