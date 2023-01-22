const express=require('express');
const app=express();
const bodyperser=require('body-parser');

const cors=require('cors')
app.use(cors());
app.use(bodyperser.urlencoded({extended:true}));
app.use(bodyperser.json());

const sequelize=require('./util/connection');
const router=require('./router/signupmodule');

 app.use(router);
// app.use('/signuppage',(req,res,next)=>{
// res.send('<h1>hello ajay</h1>')
// })
sequelize.sync().then((result)=>{
    app.listen(4000);
}).catch(error=>{
    console.log(error);
});

