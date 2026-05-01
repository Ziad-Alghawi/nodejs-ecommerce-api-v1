const express = require('express');
const dotenv= require("dotenv");
const morgan = require('morgan');
const mongoose = require('mongoose');
dotenv.config({path:'config.env'});

// Connect to DB
mongoose.connect(process.env.DB_URI).then((conn) =>{
  console.log(`DB connected successfully: ${conn.connection.host}`);
}).catch((err) =>{
  console.log(`DB connection error: ${err}`);
  process.exit(1);
});


const app = express();

if(process.env.NODE_ENV == 'development'){
  app.use(morgan('dev'));
console.log(`node: ${process.env.NODE_ENV}`);
}

app.get("/", (req, res) =>{
  res.send("OurAPI V23");
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>{
  console.log(`app running on port ${PORT}`);
});
