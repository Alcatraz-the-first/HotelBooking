const express =  require('express') ;
const cors = require('cors') ;
const router = express.Router();
require('dotenv').config() ;

router.get('/hotels/:place',async (req,res)=>{
    try{
        const place = req.params.place ;
        const response = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=hotel+in+${place}&key=${process.env.GOOGLE_API_KEY}`);
        if(!response){
            return res.status(404).json({ error: 'No hotels found for the specified place' });
        }
        const data = await response.json();
        res.json(data) ;
    }catch(error){
        console.error('Error fetching hotels:', error);
        res.status(500).json({ error: 'Failed to fetch hotels' });
    }
});

router.get('/images/:ref', async(req,res) =>{
    try{
        const ref = req.params.ref ;
        if(!ref) return res.status(400).json({ error: 'Photo reference is required' });
        const fetch = (await import('node-fetch')).default;
        const response = await fetch(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${ref}&key=${process.env.GOOGLE_API_KEY}`,{redirect: 'manual'});

        // Google returns a 302 redirect to the actual image
        const location = response.headers.get('location');
        if (!location) {
            return res.status(404).json({ error: 'Image not found' });
        }
        // Now fetch the actual image
        const imageResponse = await fetch(location);
        // Set headers to pass image type (jpg/png/etc.)
        res.set('Content-Type', imageResponse.headers.get('content-type'));
        // Stream the image content directly to the client
        imageResponse.body.pipe(res);
    }catch(error){
        console.error('Error fetching image:', error);
        res.status(500).json({ error: 'Failed to fetch image' });
    }
});

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

module.exports = router;