const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
const routesHandler = require('./routes/handler.js');
const mongoose = require('mongoose');
require('dotenv/config');

const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../frontend/build')));

app.use('/', routesHandler);

const DB_URI="mongodb+srv://TonvdHoogen:Pq9iz5qMAcKPWbJi@clusterton.ypqntob.mongodb.net/todolistDB"
// DB Connection
mongoose.set('strictQuery', true);
mongoose.connect(DB_URI, {useNewUrlParser:true, useUnifiedTopology:true})
.then( () => {
    console.log('DB Connected!');
})
.catch( (err) => {
    console.log(err);
});

// All other GET requests not handled before will return our React app
const myPath = path.resolve(__dirname, '../frontend/build', 'index.html');
console.log(myPath);

//
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
  });
//

const PORT = process.env.PORT || 4000; // backend routing port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
