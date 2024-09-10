const express=require('express');
const path=require('path')
const app=express();
const router=require('./routers/index')
const bodyParser = require('body-parser')
const mongoose=require('./config/db')

const PORT=9999;
const myPath=path.join(__dirname,'/views')

app.set('view engine','ejs');
app.set('views',myPath);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(myPath));
app.use('/uploads',express.static(path.join(__dirname,'/uploads')));
app.use('/images', express.static(path.join(__dirname, 'views/images')));

app.use('/',router);

app.listen(PORT,(err)=>{
    if(!err) console.log(`server running ${PORT}`);
})