const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const UserSchema = new mongoose.Schema({
  username: String
})

const User = mongoose.model("User", UserSchema);

const ExerciseSchema = new mongoose.Schema({
  
  date: Date,
  description: String,
  duration: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
})
const Exercise = mongoose.model("Exercise", ExerciseSchema);

app.use(bodyParser.urlencoded({extended: false}));
app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.route("/api/users")
  .get(async (req, res) => {
    try {
      const allUsers = await User.find({});
      res.json(allUsers);
    } catch (error) {
      res.json({error: error.message})
    }
  })
  .post(async (req, res) => {
    try {
      const {username} = req.body;
      const user = await User.create({username});
      res.json({username: user.username, _id: user._id});
    } catch (error) {
      res.json({error: error.message})
    }
  })

const isValidDate = function(date) {
   return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
}
  
app.post("/api/users/:_id/exercises", async (req, res) => {
  try {
    const user = req.params._id;
    const description = req.body.description;
    const duration = req.body.duration;
    const dateString  = req.body.date;
    let date = (!isValidDate(dateString)) ? new Date(): new Date(dateString);
    const ex = await Exercise.create({user, description, duration, date: date}); //
    await Exercise.populate(ex, "user")
    res.json({
      username: ex.user.username,
      description: ex.description,
      duration: ex.duration,
      date: ex.date.toDateString(),
      _id: ex.user._id
    })
  } catch (error) {
    res.json({error: error.message})
  }
})

app.get("/api/users/:_id/logs", async (req, res) => {
  try {
    const userId = req.params._id;
    const user = await User.findById(userId);
    let query = Exercise.find({user: userId});
    if(req.query.from)
      query = query.where("date").gte(new Date(req.query.from))
    if(req.query.to)
      query = query.where("date").lte(new Date(req.query.to))
    if(req.query.limit)
      query = query.limit(req.query.limit);
    const result = await query.exec();
    const log = []
    for(let i = 0; i < result.length; i++)
      log.push({
        description: result[i].description,
        duration: result[i].duration,
        date: new Date(result[i].date).toDateString()
      })
    res.json({
      username: user.username,
      count: log.length,
      _id: user._id,
      log
    });
  } catch (error) {
      res.json({error: error.message})
  }
})


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
