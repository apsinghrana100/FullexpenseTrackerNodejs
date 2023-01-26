const express=require('express');
const router=express.Router();
const controller=require('../controller/addexpenseC');
const authen=require('../middleware/auth');

router.post('/addexpense',authen.authenticate,controller.addexpense);
router.get('/getexpensedata',authen.authenticate,controller.fetchdata);
router.get('/getleaderboarddata',authen.authenticate,controller.leaderboarddata);
router.delete('/deleteExpenseData/:id',authen.authenticate,controller.deletedata);

// router.delete('/deleteExpenseData/:id',(req,res,next)=>{
//     console.log("i am delete calling");
// });

module.exports=router;