const express =require ('express');
const app=express();


const router=express.Router();app.use('/specificpath', router);
router.get('/display',function(req,res,next){

    console.log('Displaying data with limit to 50 entries');
    const { date,
        from,
        to,
        busOwnerID,
        startTime,
        endTime,
        category,
        seatbooked,
        bus_no,
        animeties_list,
        busFare,
        busName}=req.query;
        
console.log('Received USer Data',date,
from,
to,
busOwnerID,
startTime,
endTime,
category,
seatbooked,
bus_no,
animeties_list,
busFare,
busName);
res.json({ message: 'Data displayed' });
    //res.end();
})

app.use(router);

module.exports=app;