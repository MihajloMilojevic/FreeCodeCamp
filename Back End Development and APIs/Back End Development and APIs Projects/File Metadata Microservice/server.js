var express = require('express');
var cors = require('cors');
const formidable = require('formidable')
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/fileanalyse", (req, res) => {
  new formidable.IncomingForm().parse(req, (err, fields, files) => {
    if (err) {
      return res.json({error: err.message})
    }
    const name = files.upfile.originalFilename;
    const size = files.upfile.size;
    const type = files.upfile.mimetype;
    res.json({name, type, size});
  })
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
