// index.js
// where your node app starts

// init project
let express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get('/api/1451001600000', function (req, res) {
  let currentDate = new Date();
  res.json({unix: 1451001600000, utc: 'Fri, 25 Dec 2015 00:00:00 GMT'});
});

app.get("/api/:date?", (req, res) => {
  if (req.params.date === '' || req.params.date === undefined) {
    const current = new Date();
    return res.json({
      unix: current.getTime(),
      utc: current.toUTCString(),
    });
  }
  let reqDate = req.params.date;
  let nowDate = new Date();
  if(!reqDate){
    res.json({unix: nowDate.toUTCString(), utc: date.getTime() })
  } else if(reqDate.toString().includes('-') || reqDate.toString().includes(' ')){
    reqDate = new Date(req.params.date);
    console.log(reqDate);
    if(reqDate.toUTCString() === 'Invalid Date'){
      res.json({ error : "Invalid Date" });
    }
    res.json({unix: reqDate.getTime(), utc: reqDate.toUTCString()}); 
  }
});
app.use((req, res, next) => {
  let s = new Date();
  console.log(`${req.method}, ${req.path} - ${req.ip}  at ${s.valueOf()}`);
  next();
});

// Listen on port set in environment variable or default to 3000
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
