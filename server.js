const express = require('express')
const app = express()

var options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html'],
    index: false,
    maxAge: '1d',
    redirect: false,
    setHeaders: function (res, path, stat) {
      res.set('x-timestamp', Date.now())
    }
  }
  
app.use(express.static('static', options))
  
app.get('/', (req, res) => res.redirect('/index.html'))

app.get('/random-number', (req, res) => res.send({value: Math.random()}))

app.listen(3000, () => console.log('Server running: http://localhost:3000/'))