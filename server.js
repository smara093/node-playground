const express = require('express')
const MongoClient = require('mongodb').MongoClient

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

app.get('/random-number', (req, res) => {
  var randomNumber = { value: Math.round(Math.random()*10000) }
  try
  {
    MongoClient.connect('mongodb://localhost:27017', function (err, database) {
      if (err) throw err
      database.db("randomNumbers").collection("requests").insertOne(
        { generatedObject: randomNumber, dateIn: new Date().toISOString() })
    })
  } catch(error)
  {
    console.log("writing random number to the database failed miserably. I will still return it.")
  }
  
  res.send(randomNumber)
})

app.listen(3000, () => console.log('Server running: http://localhost:3000/'))