const express = require('express')
const app = express()
app.get('/', function(req, res) {
  res.send('Moona Hoshinova Sudah Aktif')
})
app.listen(3000)
require("./bot.js")