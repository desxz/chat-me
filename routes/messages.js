const express = require('express');
const router = express.Router();
const Messages = require('../src/lib/Messages');

/* GET home page. */
router.get('/list', function(req, res, next) {
  Messages.list(req.query.roomId, messages => {
    res.json(messages);
  });
});

module.exports = router;
