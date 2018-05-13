var express = require('express');
var router = express.Router();

/* goes to login page with bootstrap modal pop up */
router.get('/', function(req, res, next) {
  res.render('login');
});

module.exports = router;