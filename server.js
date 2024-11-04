const express = require('express')
//前端傳來的request需要經過轉換才能讓Express知道是JSON
const app = express()
const signin=require('./controllers/signin')
const register=require('./controllers/register')
const profile=require('./controllers/profile')
const image=require('./controllers/image')

//密碼雜湊
const bcrypt = require('bcrypt')

//連結database使用Knex.js
const knex = require('knex')
//使用knex語法
const db = knex({
    client: 'pg',
    connection: {
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    password: '',
    database: 'smart-brain',
  },
})
db.select('*').from("users").then()


//避免遇到Cors
const cors =require('cors')
app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())


//route contorller
app.get('/',(req,res)=>{
    res.send('success')
})

//singin req=>POST res=>success or faail
app.post('/signin',(req,res)=>{signin.handleSignin(req,res,bcrypt,db)})

//register req=>POST user
app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)})

//profile/:userId req=>GET user
app.get('/profile/:id',(req,res,)=>{profile.handleProfileGet(req,res,db)})

//rank req=>PUT user
app.put('/image',(req,res)=>{image.handleImage(req,res,db)})
 
//API router
app.post('/imageurl',(req,res)=>{image.handleApiCall(req,res)})

const PORT=process.env.PORT ||3000
app.listen(PORT,()=>{
    console.log(`app is running on port ${PORT}`)
})



