const express=require('express');
const app=express();
const bodyperser=require('body-parser');

const cors=require('cors')
app.use(cors());
app.use(bodyperser.urlencoded({extended:true}));
app.use(bodyperser.json());

const sequelize=require('./util/connection');
const routerlogin=require('./router/signupmodule');
const routerexpense=require('./router/expense');

const usertbl=require('./module/usertable');
const expenstbl=require('./module/expenstable');

app.use((req,res,next)=>{
    console.log(req.body.username);
    // try {
    //     usertbl.findAll({where:{
    //         username:req.body.username
    //     }})
    // } catch (error) {
        
    // }
    next();
})
 app.use(routerlogin);
 app.use(routerexpense);
// app.use('/signuppage',(req,res,next)=>{
// res.send('<h1>hello ajay</h1>')
// })

usertbl.hasOne(expenstbl);

sequelize.sync().then((result)=>{
    app.listen(4000);
}).catch(error=>{
    console.log(error);
});

