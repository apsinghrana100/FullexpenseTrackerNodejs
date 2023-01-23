const express=require('express');
const router=express.Router();
const controller=require('../controller/addexpenseC');

router.post('/addexpense',controller.addexpense);
router.get('/getexpensedata',controller.fetchdata);
router.put('/deleteExpenseData/:id',controller.deletedata);

module.exports=router;