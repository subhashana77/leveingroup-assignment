const express = require('express');
const { generateUsername } = require("unique-username-generator");
const router = express.Router();

/* GET users listing. */
router.get('/random-username', function(req, res, next) {

  const username = generateUsername();

  res.send(
      {data: username}
      );
});

module.exports = router;
