const express = require('express');
const mongoose = require('mongoose');
const db = mongoose.connection;
const app = express();

// Routes
app.get('/', (req, res) => {
  res.send('root route')
});

//-------------------------//
//  Environment Variables  //
//-------------------------//
const port = process.env.PORT || 5000;
// const MONGODB_URI = process.env.MONGODB_URI

//---------------------------//
//  App Listener: Port 5000  //
//---------------------------//
app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});

//------------------------//
//  Connect to Mongooose  //
//------------------------//
