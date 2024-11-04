const handleRegister=(req,res,db,bcrypt) => {
const {name,email,password}=req.body
//避免輸入空值註冊到資料庫
if(!name || !email || !password){
    return res.status(400).json('incorrect form submission')
}
//此處雜湊密碼為了方便使用sync方式
    const hash=bcrypt.hashSync(password,10)
    //將資料更新回傳到login和users table中
    db.transaction(trx=>{
        trx.insert({
            email:email,
            hash:hash
        })
        .into('login')
        .returning('email')
        .then(loginEmail=>{
            return trx('users')
            .returning('*')
            .insert({
                name:name,
                email:loginEmail[0].email,
                joined:new Date()
            })
            .then(user=>{
                res.json(user[0])
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    //如有錯誤必須讓使用者知道
    .catch(err=>res.status(400).json('unable to register'))
}
module.exports={
    handleRegister:handleRegister
}