const express=require('express');
const app=express();

const router=express.Router();
app.use('/specificpath',router);
router.get('/citynames',async function(req,res,next){
    const collection=req.db.collection('state_district');
    const findDetail=await collection.distinct('districts')
   // const findDetail=await collection.distinct({state,districts})
    res.json(findDetail);
})

app.use(router);

module.exports=app;