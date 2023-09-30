const express = require('express');
const app = express();
const router = express.Router();
app.use('/specificpath', router);

router.get('/paramrequest', async function (req, res, next) {
  const { from, to, date } = req.query;
  console.log('Received Query Parameters:');
  console.log('from:', from);
  console.log('to:', to);
  console.log('date:', date);

  try {
    const collection = req.db.collection('trips');
    const findDetail = await collection.find({ from, to, date }).toArray();

    if (findDetail.length === 0) {
      res.status(404).json({ error: 'No results found' });
    } else {
      res.json(findDetail); // Send the query results as JSON response
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.use(router);

module.exports = app;
