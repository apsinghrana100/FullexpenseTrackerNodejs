const express=require('express');
const session = require('express-session');
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

const authen=require('./middleware/auth');
 app.use(routerlogin);
 app.use(routerexpense);


usertbl.hasMany(expenstbl);
expenstbl.belongsTo(usertbl);

sequelize.sync().then((result)=>{
    app.listen(4000);
}).catch(error=>{
    console.log(error);
});

