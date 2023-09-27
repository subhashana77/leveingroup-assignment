const express = require('express');
const fs = require('fs');
const crypto = require('crypto');
const Post = require('./../models/post');

const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/upload-post', function (req, res, next) {

  if (req.body) {
    const base64Image = req.body.image;
    const caption = req.body.caption;
    const username = req.body.username;

    if (!base64Image) {
      res.send({
        msg: 'Image is not found'
      });
    } else if (!caption) {
      res.send({
        msg: 'Caption is not found'
      });
    } else if (!username) {
      res.send({
        msg: 'Username is not found'
      });
    } else {

      const uuid = crypto.randomUUID();
      const extension = base64Image.split(';')[0].split('/')[1];
      const fileName = uuid + '.' + extension;
      fs.writeFile(`./public/images/${fileName}`, base64Image.split(';base64,').pop(), {encoding: 'base64'}, function(err) {
        res.send({
          msg: 'File is created'
        });
      });

      Post.create({
        username: username,
        caption: caption,
        image: fileName
      }).then(value => {
        const createdData = value?.dataValues;
        res.send(createdData);
      }).catch(err => {
        res.send({

          msg: 'Failed to save post'
        });
      });
    }

  } else {
    res.send({
      msg: 'Post not found'
    });
  }
});

module.exports = router;
