const express=require ('express');
const router=express.Router();
const app=express;
app.use('/specificpath', router);

router.post('/savedBookings',function(req,res,next){
    const{full_name,age,contact,address}=req.query;
    try{
        const collection=req.body.collection('Bookings');
        
        
    }

})
