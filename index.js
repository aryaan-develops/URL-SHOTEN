const express= require("express");
const path = require('path')
const cookieParser= require('cookies-parser')
const {connectToMongodb}=require('./connect')
const {restrictToLoggedinUserOnly}=require('./middleware/auth')

const URL= require('./models/url')

const urlRoute=require('./routes/url')
const staticRouter= require('./routes/staticrouter')
const userRoute= require('./routes/user')






const app= express();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const Port =8000;

app.set("view engine", "ejs");
app.set('views', path.resolve('./views'))

connectToMongodb("mongodb://localhost:27017/short-url")
.then(console.log("Mongodb connected"))

app.use(express.json());

app.use("/",staticRouter);
app.use("/user",userRoute);
app.use('/url', restrictToLoggedinUserOnly,urlRoute);



app.get("/test",async (req,res)=>{
    const alluser= await URL.find({})
    return res.render('home',{
        urls:alluser,

    });
        
})


app.get('/:shortId', async(req,res)=>{
    const shortId=req.params.shortId;
     const entry= await URL.findOneAndUpdate({shortId},
        {$push: {
            visitHistory: {
                timestamp:Date.now(),
            },
        },
    }
    );
    res.redirect(entry.redirectURl);
})


app.listen(Port,()=>console.log(`Server Started at PORT : ${Port}`))