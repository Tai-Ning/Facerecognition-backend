//使用Clarifai API
const  setupClarifai = (imageUrl) => {
    const PAT = process.env.CLARIFAI_API_KEY;
    const USER_ID = 'm92li301e7uq'    
    const APP_ID = 'facerecognitionbrain'
    // const MODEL_ID = 'face-detection' 
    const IMAGE_URL = imageUrl
    const raw = JSON.stringify({
          "user_app_id": {
              "user_id": USER_ID,
              "app_id": APP_ID
          },
          "inputs": [
              {
                  "data": {
                      "image": {
                          "url": IMAGE_URL
                      }
                  }
              }
          ]
      });

    const requestOptions = {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Authorization': 'Key ' + PAT
          },
          body: raw
      };
    return requestOptions
}
const handleApiCall=(req,res)=>{
 fetch("https://api.clarifai.com/v2/models/" + "face-detection" + "/outputs", setupClarifai(req.body.inputUrl))
 //將response物件轉換成JSON格式
 .then(data=>data.json() )
 //將response傳遞到前端
 .then(result=>res.json(result))
 .catch(err=>res.status(400).json('unable to work with API'))
}


const handleImage=(req,res,db)=>{
    const {id} = req.body
    //從database取出entries
    db('users').where({
        id:id
    }).increment('entries',1)
    .returning('entries')
    .then(entries=>res.json(entries[0].entries))
    .catch(err=>res.status(400).json('unable to get entries'))
}

module.exports={
    handleImage:handleImage,
    setupClarifai:setupClarifai,
    handleApiCall:handleApiCall
}