const handleRegister=(req,res,db,bcrypt) => {
const {name,email,password}=req.body
//測試
console.log('Received registration data:', { name, email, password })
//避免輸入空值註冊到資料庫
if(!name || !email || !password){
    //測試
    console.log('Incorrect form submission')
    return res.status(400).json('incorrect form submission')
}
//此處雜湊密碼為了方便使用sync方式
    const hash=bcrypt.hashSync(password,10)
    //測試
    console.log('Hashed password:', hash)
    //將資料更新回傳到login和users table中
    db.transaction(trx=>{
        trx.insert({
            email:email,
            hash:hash
        })
        .into('login')
        .returning('email')
        .then(loginEmail=>{
            //測試
            console.log('Email registered in login table:', loginEmail)
            return trx('users')
            .returning('*')
            .insert({
                name:name,
                email:loginEmail[0].email,  
                joined:new Date()
            })
            .then(user=>{
                //測試
                console.log('User registered in users table:', user[0])
                res.json(user[0])
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    //如有錯誤必須讓使用者知道
    .catch(err=>{
        //測試
        console.error('Unable to register:', err)
        res.status(400).json('unable to register')
    })
}
module.exports={
    handleRegister:handleRegister
}