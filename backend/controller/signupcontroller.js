
const Sequelize=require('sequelize');
const usermodule=require('../module/usertable');


exports.addpostdata=(async(req,res,next)=>{

   await usermodule.count({where:{useremailid:req.body.emailid}})
    .then(count=>{
        console.log('cout'+count);
        if(count>0)
        {
            console.log("email id duplicate");
            return res.json(true);
        }
        else
        {
            usermodule.create({
                username:req.body.username,
                useremailid:req.body.emailid,
                userpass:req.body.password,
            }).then((response)=>{
                 return res.json(false);
            });
        }
    });
    
        // try {
        //     usermodule.findAll({where:{useremailid:req.body.emailid}})
        //     .then((response)=>{
        //         console.log("emailids"+response);
        //         if(response)
        //         {

        //              console.log("true"+response);
        //             usermodule.create({
        //                 username:req.body.username,
        //                 useremailid:req.body.emailid,
        //                 userpass:req.body.password,
        //             }).then((response)=>{
        //             return res.json(false);
        //             }).catch(error=>{
        //                 console.log("jdkfjdjf"+error);
        //             })
        //         }
        //         else
        //         {
        //             console.log("ddddd"+response);
        //             res.json(true);
        //         }
        // }).catch((error)=>{
        //     console.log("jdkfjdjf1"+error);
        // })
        
    // }catch (error) {
    //    console.log("errrp------"+error);
    // }
});


exports.logincred=(async(req,res,next)=>{
    console.log("email"+req.body.emailid);
    console.log("password"+req.body.password);
try {
    

    const {count}=await usermodule.findAndCountAll({where:{useremailid:req.body.emailid}});
    console.log("count"+count);
    if(count>0)
    {
        const isvaliduser= await usermodule.findAndCountAll({
            where: Sequelize.and(
                { useremailid: req.body.emailid },
                { userpass: req.body.password}
            )})
            console.log("abc count"+isvaliduser.count);
            
        if(isvaliduser.count)
        {
            return res.json({msg:"Login Successfull"});
        }
        else
        {
            return res.status(401).send({error:"User not authorized!!"});
        }
        
    }
    else
    {
        return res.status(404).send({error:"404 - Not Found"});
    }
} catch (error) {
    console.log(error);
}
   
});
