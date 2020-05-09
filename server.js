
require('dotenv');



const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

const indexRouter = require('./routes/index');


//Database
const mongoose = require('mongoose');

// mongoose.connect( 'error',
//                   process.env.DATABASE_URL, 
//                   { useNewUrlParser: true ,
                    
//                   }
//                 );

 
  // mongoose.connect("mongodb://localhost/library").catch((e) => {
  //     console.error(e);
  //   });

    mongoose
      .connect("mongodb://localhost/library", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("MongoDB Connected..."))
      .catch((err) => console.log(err));

const db = mongoose.connection;



db.on('error', err => console.error(err));
db.once('open', () => console.log('DB Connection successfull!'));



app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');

app.use(expressLayouts);
app.use(express.static('public'));


// Routering page
app.use(indexRouter);



const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server started on PORT: ${PORT}...`)); 