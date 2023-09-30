const bodyParser = require('body-parser');
const express = require('express')
const app = express()


const router=express.Router();
app.use(router);
app.use('/specificpath', router);
app.use(bodyParser.json());
app.post('/businput',function(req,res,next){
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
        busName}=req.body;


console.log('Received USer Input',date,
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

res.status(200).json({message:'Input Recieved'})
})

module.exports = app;