const express = require('express');
const fs = require('fs');
const crypto = require('crypto');
const Post = require('./../models/post');
const Comment = require('./../models/comment');
const mysql_package = require('mysql');
const db = require('../database/sequelise-instance');

const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/all-posts', async function (req, res, next) {
  if (!req) {
    res.send('Post are empty');
  } else {
    const post = await Post.findAll({});
    res.send(post);
  }
});
// router.get('/all-posts', async function (req, res, next) {
//   if (!req) {
//     res.send('Post are empty');
//   } else {
//     const rows = await db.query('select posts.id, posts.username, posts.caption, posts.image, comments.postId, comments.\`comment\`,  comments.updatedAt from posts, comments where posts.id = comments.postId');
//     res.send(rows);
//     console.log(rows);
//   }
//     // const sql = "select posts.id, posts.username, posts.caption, posts.image, comments.id, comments.postId, comments.comment from posts inner join comments on posts.id = comments.postId;";
//
// });


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
      });
    }
  } else {
    res.send({
      msg: 'Post not found'
    });
  }
});

router.post('/upload-comment', function (req, res, next) {
  if (req.body) {
    console.log(req.body);
    const postId = req.body.postId;
    const comment = req.body.comment;

    if (!postId) {
      res.send({
        msg: 'Post Id Not Found'
      });
    } else if (!comment) {
      res.send({
        msg: 'Comment is not found'
      });
    } else {
      Comment.create({
        postId: postId,
        comment: comment
      });
    }
  } else {
    res.send({
      msg: 'Post not found'
    });
  }
});

module.exports = router;
