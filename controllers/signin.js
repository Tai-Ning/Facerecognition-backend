const handleSignin = (req,res,bcrypt,db)=>{
    const {email,password}=req.body
    if(!email || !password){
        return res.status(400).json('incorrect form submission')
    }
    db.select('email','hash').from('login')
        //檢查信箱有無吻合
        .where('email','=',email)
        .then(data=>{
           // console.log(data)
           //檢查密碼是否吻合
            const isValid=bcrypt.compareSync(password,data[0].hash)
            if(isValid){
                //如吻合回傳符合使用者資料
               db.select('*').from('users')
               .where('email','=',email)
               .then(user=>
                res.json(user[0]) 
               )
               .catch(err=>res.status(400).json('unable to get user'))
            }else{
                res.status(400).json('wrong credentials')
            }
        })
        .catch(err=>res.status(400).json('wrong credentials'))
    }

module.exports={
    handleSignin:handleSignin
}