var express = require('express')
var app = express()

app.listen(3000, function () {
  console.log('Server started!')
})

app.use('/', express.static('static'))
app.use('/lib', express.static('node_modules/angular'))