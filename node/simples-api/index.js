const express = require('express')
const body_parser = require('body-parser')
const route_users = require('./routes/users')

const app = express()
const port = 3000

app.use(body_parser.urlencoded({extended:false }))
route_users(app)
app.get('/',(req,res)=>{
    res.send('home')
}).listen(port, ()=> console.log(`Servido iniciado localhost:${port}`))