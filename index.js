const express = require('express');
const multer = require('multer')
const {admin} = require('./firebase/admin');

const {firebaseApp, uploader} = require('./firebase/firebase.config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', async(req, res, next)=>{
    res.send('home page')
})


const upload = multer({ 
    storage: multer.memoryStorage()
 });



app.post('/yukle',upload.single("filename"), async (req, res)=>{
try {
    console.log('hit api')
    const {file} = req
    console.log(file.originalname)
   
    const fileurl = await uploader(file) //uploadFile(filepath, filename)
    res.status(200).json({
        user: req.body.username,
        imageUrl: fileurl
     })
} catch (error) {
    console.log(error)
}})

app.use((req,res,next)=>{

    res.status(404).json('not found')
});

app.use((err, req, res, next)=>{
    res.status(500).json(err)
}  )

app.listen(7001, ()=>{
    console.log('rruning');
});