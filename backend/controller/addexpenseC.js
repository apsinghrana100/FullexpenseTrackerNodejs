const Sequelize=require('sequelize');
const bcrpt=require('bcrypt');
const expensemodule=require('../module/expenstable');
const authen = require('../middleware/auth');
const session = require('express-session');

exports.addexpense=(async(req,res,next)=>{
    console.log(req.body.expense);
    console.log(req.body.choice);
    console.log(req.body.description);
    console.log("inser"+req.user.id);
    
    try {
        if(
         await expensemodule.create({
                expense:req.body.expense,
                // expense:"lhjh",
                choice:req.body.choice,
                description:req.body.description,
                tbluserdetailId:req.user.id
               
             })){return res.status(200).json({success:true,msg:"Data Insert Successfully"})}
    } catch (error) {
        console.log("somewent wrong in addexpense"+error);
        return res.status(400).json({success:false,msg:"Something Went Wrong"});
    }
});

exports.fetchdata=(async(req,res,next)=>{
    console.log("i am fetch daling"+req.user.id);
    try {
        const expensedata=await expensemodule.findAll({where:{tbluserdetailId:req.user.id}});
        console.log("data"+expensedata.length);
        if(expensedata.length>0 && expensedata!==null && expensedata!==undefined)
        {
            res.status(200).json({success:true,msg:"Record Fetch successfully",expensedata});
        }else if(expensedata.length===0){
            res.status(200).json({success:true,msg:"No Record Found",expensedata});
        }
    } catch (error) {
        res.status(400).json({success:false,msg:"Something went wrong"});
    }
})

exports.deletedata=(async(req,res,next)=>{ //where:{id:req.params.id,tbluserdetailId:req.user.id}
    console.log(" i am dele"+req.user.id);
    try {
        console.log(" i am dele"+req.params.id);
                const deletedata=await expensemodule.destroy({where:{id:req.params.id,tbluserdetailId:req.user.id}});

        if(deletedata)
        {
            console.log("data deleted succfully"+deletedata);
            return res.status(200).json({success:true,msg:"data deleted successfully"})
        }

    } catch (error) {
        console.log("something went wrong in delete section");
        return res.status(400).json({success:false,msg:"something went wrong in delete sections"}) 
    }
})