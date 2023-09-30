const express =require ('express');
const app=express();


const router=express.Router();
app.use('/specificpath', router);
router.get('/tripdetails',async function(req,res,next){
    try{
        //const db=clients.db(dbName)
        const collection=req.db.collection('trips');
        const findDetail=await collection.find({}).toArray();
        
        console.log("f",findDetail);
        return res.json(findDetail);
    }
    catch{
        
        console.error();
    }
    })
    
    app.use(router);
    
    module.exports=app;
