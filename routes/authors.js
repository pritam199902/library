const express = require("express");
const router = express.Router();
const Author = require('../models/author')


// All authors
router.get("/", async (req, res) => {
  let srcOption = {}
  if (req.query.name != null && req.query.name != '')
  {
    srcOption.name = new RegExp(req.query.name, 'i')
  }
  //From -view-
  try 
  {
    const authors = await Author.find(srcOption);
    res.render("authors/index", {
                                  authors: authors,
                                  srcOption: req.query  
                                });
  }
  catch
  {
    res.redirect('/');
  }
  
});

// New Auther
router.get("/new", (req, res) => {
  //From -view-
  res.render("authors/new", {author: new Author()});
});

// Create new Auther
router.post("/", async (req, res) => {
  const author = new Author({  // creating new Author object
    name: req.body.name,       // assigning name
  });

    try 
    {
      const newAuthor = await author.save()
      // res.redirect(`authors/${newAuthor.id}`);
      res.redirect('authors');
    }
    catch
    {
      res.render('authors/new', {
        author: author,
        errorMessage: 'Error while creating new Author!',
      })
    }
});

//   author.save((err, newAuthor) => {
//     if (err) {
//       
//       })
//     }else{
//       // res.redirect(`authors/${newAuthor.id}`);
//       res.redirect('authors');
//     }
//   })
// });


module.exports = router;
