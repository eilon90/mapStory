const express = require('express');
const router = express.Router();
const cloudinary = require("../../utils/cloudinary");
const upload = require("../../utils/multer");
const urllib = require('urllib');

router.use(express.json());
router.use(express.urlencoded({extended: false}));

const Story = require('../models/Story');
const Event = require('../models/Event');


router.get('/stories', async function(req, res) {
    console.log('uploading stories');
    const stories = await Story.find({});
    res.send(stories);
})


router.post('/story', async function(req, res) {
    const story = new Story({...req.body});
    const savedStory = await story.save();
    console.log(`Saved ${savedStory}`);
    res.end();
})

router.post('/event/:story', upload.single("image"), async function(req, res) {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        req.body.photos =[]
        req.body.photos.push(result.secure_url)
        const event = new Event({...req.body});
        await Story.update({title: req.params.story}, {$push: {events: event}});
        res.send(event);
      } catch (err) {
        console.log("error: "+err);
        res.end()
      }
})

// router.put('/story/:title', async function(req, res) {
//     const changes = ({...req.body});
//     await Story.update({title: req.params.title}, {title: changes.title, description: changes.description});
//     res.end();
// })

// router.put('/event/:story', async function(req, res) {
//     const changes = ({...req.body});
//     await Story.update({title: req.params.story}, {events: changes})
//     res.end();
// })

router.delete('/story/:title', async function(req, res) {
    const story = await Story.findOneAndRemove({title: req.params.title});
    console.log(`${story.title} deleted`);
    res.end();
})


router.delete('/event/:story/:event', async function(req, res) {
    await Story.update({title: req.params.story}, {$pull: {events: {title: req.params.event}}});
    console.log(req.params)
    console.log(`one event deleted`);
    res.end();
})

router.get('/countries', function(req, res){
    urllib.request(`https://restcountries.eu/rest/v2/all`, function(err, response) {
        const data = JSON.parse(response.toString());
        const countries = data.map(d => {return {country: d.name}});
        res.send(countries);
    })
})

router.get('/search/:address/:country', function(req, res) {
    urllib.request(`https://api.opencagedata.com/geocode/v1/json?q=${req.params.address}, ${req.params.country}&key=91ffffa3e2f84a4f8ce2f9763bc49bce&pretty=1`, function(err, response) {
        const data = JSON.parse(response.toString());
        console.log(data);
        
        if (data.results[0].confidence === 1) {
            res.send({error: true});
        }
        else {
            const results = data.results.map(d => {return {longtitude: d.geometry.lng, latitude: d.geometry.lat}});
            res.send(results);
        }
    })
})


router.get('/address/:lat/:lng', function(req, res){
    urllib.request(`https://api.opencagedata.com/geocode/v1/json?q=${req.params.lat}%2C+${req.params.lng}&key=91ffffa3e2f84a4f8ce2f9763bc49bce&pretty=1`, function(err, response) {
        const data = JSON.parse(response.toString());
        const result = {address: data.results[0].formatted};
        res.send(result);
    })
})

router.get('/bounds/:country', function(req, res) {
    urllib.request(`https://api.opencagedata.com/geocode/v1/json?q=${req.params.country}&key=91ffffa3e2f84a4f8ce2f9763bc49bce&pretty=1`, function(err, response) {
        const data = JSON.parse(response.toString());
        const bounds = {
            NHLat: data.results[0].bounds.northeast.lat,
            NHLng: data.results[0].bounds.northeast.lng,
            SWLat: data.results[0].bounds.southwest.lat,
            SWLng: data.results[0].bounds.southwest.lng
        }
        res.send(bounds);
    })

    // /:NHLat/:NHLng/:SWLat/:SWLng
})




module.exports = router