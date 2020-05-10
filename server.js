
// require('dotenv');

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

const indexRouter = require('./routes/index');
const authorRouter = require("./routes/authors");
const bodyParser = require('body-parser');


const PORT = process.env.PORT || 3000;



//Database
const mongoose = require('mongoose');

    mongoose
      .connect(
        "mongodb+srv://user:pritamdas@123@cluster0-pwu20.mongodb.net/test?retryWrites=true&w=majority",
        {
          useNewUrlParser: true,

          useUnifiedTopology: true,
        }
      )
      .then(() => console.log("MongoDB Connected..."))
      .catch((err) => console.error("X  getting error on connection.... "));
const db = mongoose.connection;

db.on('error', err => console.error('X  getting error..'));
db.once('open', () => console.log('DB Connection successfull!'));



app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');

app.use(expressLayouts);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));
// Routering page
app.use('/',indexRouter);
app.use("/authors", authorRouter);



app.listen(PORT, console.log(`Server started on PORT: ${PORT}...`)); 