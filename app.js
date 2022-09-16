const express = require('express');
 const app = express();
 const port = 4300;

 app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true}));

app.get('/api/v1/test', (req, res) => {
      res.send("Node CURD Student System is Running")
})
//import student route
const students = require('./students');
app.use('/api/v1/students',students);

// start serving
app.listen(port, () => { console.log('node server started')})