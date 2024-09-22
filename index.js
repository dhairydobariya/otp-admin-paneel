const express = require('express');

const app = express()

const route = require('./route/route')

const port = process.env.port || 5001;

const body_parser = require('body-parser')
require('dotenv').config();
const mongoose = require('./db/userdb')

const cookie_parser = require('cookie-parser')

const path = require('path')

app.set('view engine' , 'ejs')

app.use(body_parser.urlencoded({extended: true}))

app.use(express.static(__dirname + '/assets'));

app.use(cookie_parser())

app.use('/' , route)

app.use('/views/uploads' , express.static('./views/uploads'));

mongoose

app.listen(port , (req , res) =>{

    console.log(`${port} is correct `);
    
})