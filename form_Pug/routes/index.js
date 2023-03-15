const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index', 
    { titlePage : "Home",
      urlHome : "#",
      urlInquiries : "./query_log",
      urlContact : "./contact",
      urlCalc : "./calc",
      urlPockemon : "./apiPockemon"
    });
});

module.exports = router;