const express = require('express') ;
require('dotenv').config() ;
const router = express.Router() ;

router.get('/details/:id', async(req,res)=> {
    try{
        const id = req.params.id ;
        const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&key=${process.env.GOOGLE_API_KEY}`);
        if(!response){
            return res.status(404).json({ error: 'No hotel details found for the specified ID' });
        }
        const data = await response.json() ;
        res.json(data) ;
    }catch(error){
        console.error('Error fetching hotel details:', error);
        res.status(500).json({ error: 'Failed to fetch hotel details' });
    }
});

module.exports = router ;