const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('contact', 
    { titlePage : "Contact",
      urlHome : "./",
      urlInquiries : "./query_log",
      urlContact : "#",
      urlCalc : "./calc"
    });
});

module.exports = router;