const Sequelize=require('sequelize');
const bcrpt=require('bcrypt');
const expensemodule=require('../module/expenstable');

exports.addexpense=(async(req,res,next)=>{
    console.log(req.body.expense);
    console.log(req.body.choice);
    console.log(req.body.description);
    try {
        if(
         await expensemodule.create({
                expense:req.body.expense,
                // expense:"lhjh",
                choice:req.body.choice,
                description:req.body.description
                
               
             })){return res.status(200).json({success:true,msg:"Data Insert Successfully"})}
    } catch (error) {
        console.log("somewent wrong in addexpense"+error);
        return res.status(400).json({success:false,msg:"Something Went Wrong"});
    }
});

exports.fetchdata=(async(req,res,next)=>{
    console.log("i am fetch daling");
    try {
        const expensedata=await expensemodule.findAll();
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

exports.deletedata=(async(req,res,next)=>{
    try {
        const deletedata=await expensemodule.destroy({where:{id:req.params.id}});
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