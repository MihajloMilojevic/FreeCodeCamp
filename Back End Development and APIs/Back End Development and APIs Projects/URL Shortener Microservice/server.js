require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser");
const validator = require('validator');
const mongoose = require("mongoose")


// Basic Configuration
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })


const URLSchema = new mongoose.Schema({
  original_url: String,
  short_url: Number
})

const URL = mongoose.model("URL", URLSchema);

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));
app.use(bodyParser.urlencoded({extended: false}))

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post("/api/shorturl", async (req, res) => {
  try {
    const original_url = req.body.url;
    console.log(original_url)
    if(!(validator.isURL(original_url, {protocols: ['http','https'], require_valid_protocol: true}))) 
    {
      throw new Error("");
    }
    const short_url = await URL.count({});
    const url = await URL.findOne({original_url});
    if(url !== null)
      return res.status(200).json({original_url: url.original_url, short_url: url.short_url});
    const newUrl = await URL.create({original_url, short_url});
    return res.status(201).json({original_url: newUrl.original_url, short_url: newUrl.short_url});
  } catch (error) {
    res.json({ error: 'invalid url' })
  }
})

app.get("/api/shorturl/:short_url", async (req, res) => {
  try {
    const short_url = req.params.short_url;
    const url = await URL.findOne({short_url});
    res.redirect(url.original_url);
  } catch (error) {
    res.json({ error: 'invalid url' })
  }
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
