const sequelize=require('sequelize');
const Sequelize=require('../util/connection');

const bcrpt=require('bcrypt');
const expensemodule=require('../module/expenstable');
const tbluserdetail=require('../module/usertable');
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
    console.log("i am premi"+req.user.ispremium);
    try {
        const expensedata=await expensemodule.findAll({where:{tbluserdetailId:req.user.id}});
        console.log("data"+expensedata.length);
        if(expensedata.length>0 && expensedata!==null && expensedata!==undefined)
        {
            res.status(200).json({success:true,msg:"Record Fetch successfully",expensedata,ispremiumuser:req.user.ispremium});
        }else if(expensedata.length===0){
            res.status(200).json({success:true,msg:"No Record Found",expensedata,ispremiumuser:req.user.ispremium});
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
,
            //   [sequelize.fn('SUM', sequelize.col('expense')), 'total_expense'
exports.leaderboarddata=(async (req,res)=>{
    console.log("show leaderboard is calling");
    try {
        // const leaderedata= tbluserdetail.findAll({
        //     attributes: ['username'],
        //     include: [
        //       {
        //         model: expensetbls,
        //         attributes: [[sequelize.fn('SUM', sequelize.col('expense')), 'totalExpense']],
        //         group: ['tbluserdetails.id']
        //       }
        //     ]
        //   })
        //     .then(results => {
        //       // results will contain the result of the query
        //       console.log("ia m not calling");
        //       console.log(results);
        //     })
        //     .catch(err => {
        //       // handle error
        //       console.log(err);
        //     });
          
        const users=await tbluserdetail.findAll();
        const expenseses= await expensemodule.findAll();
        const userAggregated={};

        console.log("------"+expenseses.length);
        expenseses.forEach(element => {
            if(userAggregated[element.tbluserdetailId]){
            
            userAggregated[element.tbluserdetailId]=userAggregated[element.tbluserdetailId]+element.expense;
            console.log("---------------"+userAggregated);
            }else{
                console.log("---------------"+userAggregated);
                userAggregated[element.tbluserdetailId]=element.expense;
            }
        });

        var userLeaderBoardDetails =[];

            users.forEach((user)=>{
                userLeaderBoardDetails.push( {name: user.username, total_cost: userAggregated[user.id] || 0 }) ;
           
            });
            console.log(userLeaderBoardDetails);
            userLeaderBoardDetails.sort((a, b) => b.total_cost -a.total_cost);

        console.log("---------------"+userAggregated);
        return res.status(200).json(userLeaderBoardDetails);

            
        // console.log("data"+leaderedata.length);
        // if(leaderedata.length>0 && leaderedata!==null && leaderedata!==undefined)
        // {
        //     res.status(200).json({success:true,msg:"Record Fetch successfully",leaderedata,ispremiumuser:req.user.ispremium});
        // }else if(leaderedata.length===0){
        //     res.status(200).json({success:true,msg:"No Record Found",leaderedata,ispremiumuser:req.user.ispremium});
        // }
    } catch (error) {
        res.status(400).json({success:false,msg:"Something went wrong"});
    }

});