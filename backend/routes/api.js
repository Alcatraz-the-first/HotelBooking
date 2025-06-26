const express =  require('express') ;
const cors = require('cors') ;
const router = express.Router();
require('dotenv').config() ;

router.get('/hotels/:place',async (req,res)=>{
    try{
        const place = req.params.place ;
        const response = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=hotel+in+${place}&key=${process.env.GOOGLE_API_KEY}`);
        const data = await response.json();
        res.json(data) ;
    }catch(error){
        console.error('Error fetching hotels:', error);
        res.status(500).json({ error: 'Failed to fetch hotels' });
    }
});

module.exports = router;