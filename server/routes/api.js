const express = require('express');
const router = express.Router();
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

router.post('/event/:story', async function(req, res) {
    const event = new Event({...req.body});
    await Story.update({title: req.params.story}, {$push: {events: event}});
    res.end();
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
    console.log(`one event deleted`);
    res.end();
})




module.exports = router