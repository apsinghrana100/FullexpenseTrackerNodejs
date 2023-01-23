
const Sequelize=require('sequelize');
const bcrpt=require('bcrypt');
const usermodule=require('../module/usertable');


exports.addpostdata=(async(req,res,next)=>{
    
try {
    const pass=req.body.password
    const saltround=10;
    const count=await usermodule.count({where:{useremailid:req.body.emailid}});
    if(count>0)
        {
            console.log("email id duplicate");
            return res.json(true);
        }
        else
        {
            try {
                bcrpt.hash(pass,saltround, async(err,hash)=>{
                    await  usermodule.create({
                        username:req.body.username,
                        useremailid:req.body.emailid,
                        userpass:hash });
                        return res.json(false);
                })
                    
            } catch (error) {
                return res.json(true);
            }
          
        }
} catch (error) {
    console.log(error);
}
});


exports.logincred=(async(req,res,next)=>{
    console.log("email"+req.body.emailid);
    console.log("password"+req.body.password);
    const passwordtemp=req.body.password;
try {
    

    const userdetail=await usermodule.findAll({where:{useremailid:req.body.emailid}});
    console.log("coundt"+userdetail.length);
    if(userdetail.length>0)
    {       
            bcrpt.compare(passwordtemp,userdetail[0].userpass,(err,result)=>{
                if(err)
                {
                    console.log("something went wrong");
                    // return res.status(401).send({error:"User not authorized!!"});
                    throw new Error("User not authorized!!");
                }
                if(result===true)
                {
                    // req.session.user=userdetail;
                    return res.status(200).json({success:true,msg:"Login Successfull"});
                    //  res.redirect('/addexpense');
                }
                else
                {
                    return res.status(401).send({error:"User not authorized!!"});
                }
                
            })
        
    }
    else
    {
        return res.status(404).send({error:"404 - Not Found"});
    }
} catch (error) {
    console.log(error);
}
   
});
