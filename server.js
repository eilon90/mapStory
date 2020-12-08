const express = require('express');
const path = require('path');
const app = express();
const api = require('./server/routes/api');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mapStory');

app.use('/', api);
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'node_modules')));

const PORT = 3000;
app.listen(process.env.PORT || PORT, function() {
    console.log(`Running`);
})