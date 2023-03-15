const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('query_log',
  { titlePage : "Query Log",
    urlHome : "./",
    urlInquiries : "#",
    urlContact : "./contact"
  });
});

module.exports = router;