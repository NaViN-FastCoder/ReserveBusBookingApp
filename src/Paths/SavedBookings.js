const express=require ('express');
const router=express.Router();
// const app=express();

// app.use('/specificpath', router);




router.post('/savedBookings',async function(req,res,next){
    
    try{
        const{full_name,email,mobile,age,passenger2FullName,passenger3FullName}=req.query;
        const collection=req.db.collection('saved_trips');
        const bookingData={
            full_name,
            email,
            mobile,
            age,
            passenger2FullName,
            passenger3FullName,
        }
        if(passenger2FullName){
                bookingData.passenger2FullName=passenger2FullName;
        }
        if(passenger3FullName)
        {
            bookingData.passenger3FullName=passenger3FullName
        }
        await collection.insertOne(bookingData);
       
        console.log('Data Saved',full_name);
        res.json({message:'Data Saved Successfully'})
    }catch(error){
        console.log('Error',error);
        res.status(500).json({message:'Error saving data'});
    }
    
})
// app.use(router);
module.exports = router; 
