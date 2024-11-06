const express = require('express')
//前端傳來的request需要經過轉換才能讓Express知道是JSON
const app = express()
const signin=require('./controllers/signin')
const register=require('./controllers/register')
const profile=require('./controllers/profile')
const image=require('./controllers/image')

//密碼雜湊
const bcrypt = require('bcryptjs')

//連結database使用Knex.js
const knex = require('knex')
//使用knex語法
const db = knex({
    client: 'pg',
    connection: {
    connectionString:'postgresql://smart_brain_cmm0_user:4CMD6OigQ97uChoOBZhYo0ndgpZza7KG@dpg-csksmbl6l47c73botggg-a.oregon-postgres.render.com/smart_brain_cmm0',    
    ssl:{ rejectUnauthorized: false } 
    // host: process.env.DATABASE_HOST,
    // port: 5432,
    // user: process.env.DATABASE_USER,
    // password: process.env.DATABASE_PW ,
    // database: process.env.DATABASE_DB ,
  }
})

//測試資料庫連線
db.raw('select 1+1 as result')
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Database connection failed', err))

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
app.post('/register',(req,res)=>{
    //測試req.body
    console.log('Signin request body:', req.body)
    register.handleRegister(req,res,db,bcrypt)
})

//profile/:userId req=>GET user
app.get('/profile/:id',(req,res,)=>{profile.handleProfileGet(req,res,db)})

//rank req=>PUT user
app.put('/image',(req,res)=>{image.handleImage(req,res,db)})
 
//API router
app.post('/imageurl',(req,res)=>{image.handleApiCall(req,res)})


app.listen(process.env.PORT || 3000,()=>{
    console.log(`app is running on port ${process.env.PORT}`)
})



